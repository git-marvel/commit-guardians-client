import axios from "axios";
import { getChanges } from "../../../entities/change/services";
import { makeCommitEntityWithDiff } from "../../../entities/commit/commitEntity";
import { throwFetchErrorMessage } from "../../../shared/error/throwCustomErrorMessage";

const COMMITS_PER_PAGE = 100;
const DIFF_MEDIA_TYPE = "application/vnd.github.diff";
const DIFF_REQUEST_BATCH_SIZE = 200;
const DIFF_REQUEST_DELAY_TIME = 1000;

const setCommitBaseUrl = ({ owner, repo }) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;

const fetchWithAuth = async (url, githubToken, accept = "*/*") => {
  const result = await axios.get(url, {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: accept,
    },
  });

  const tokenRemaining = parseInt(result.headers.get("x-ratelimit-remaining"), 10);

  return result;
};

const getCommitList = async ({ owner, repo, githubToken }) => {
  const commitListUrl = `${setCommitBaseUrl({ owner, repo })}?per_page=${COMMITS_PER_PAGE}`;

  try {
    const gitCommitFirstPage = await fetchWithAuth(
      `${commitListUrl}&page=${1}`,
      githubToken
    );
    const linkHeader = gitCommitFirstPage.headers.link;
    const lastPageNumber = linkHeader
      ? parseInt(linkHeader.match(/&page=(\d+)>; rel="last"/)?.[1])
      : 1;

    const allCommits = gitCommitFirstPage.data;

    if (lastPageNumber > 1) {
      const fetchPromises = [];

      for (let page = 2; page <= lastPageNumber; page++) {
        const commitPagePromise = async () => {
          const commitPage = await fetchWithAuth(
            `${commitListUrl}&page=${page}`,
            githubToken
          );
          return commitPage.data;
        };

        fetchPromises.push(commitPagePromise());
      }

      allCommits.push((await Promise.all(fetchPromises)).flat());
    }

    return allCommits.flat();
  } catch (error) {
    throwFetchErrorMessage(error);
  }
};

const getCommitDiff = async ({ owner, repo, sha, githubToken }) => {
  try {
    const commitUrl = `${setCommitBaseUrl({ owner, repo })}/${sha}`;

    const response = await fetchWithAuth(commitUrl, githubToken, DIFF_MEDIA_TYPE);
    const changedCode = response.data;

    return getChanges(changedCode);
  } catch (error) {
    throwFetchErrorMessage(error);
  }
};

const getCommitDiffList = async ({ owner, repo, commitsToCheck, githubToken }) => {
  let answer = [];
  const iterationSize = Math.ceil(
    commitsToCheck.length / DIFF_REQUEST_BATCH_SIZE
  );

  for (let i = 0; i < iterationSize; i++) {
    const slicedCommitsToCheck = commitsToCheck.slice(
      DIFF_REQUEST_BATCH_SIZE * i,
      DIFF_REQUEST_BATCH_SIZE * (i + 1)
    );
    const fetchPromises = slicedCommitsToCheck.map(async (commitWithType) => {
      const { sha } = commitWithType;
      const diffObj = await getCommitDiff({ owner, repo, sha, githubToken });
      const commitWithDiff = makeCommitEntityWithDiff({
        commit: commitWithType,
        diffObj,
      });

      return commitWithDiff;
    });

    const chunk = await Promise.all(fetchPromises);
    answer = answer.concat(chunk);

    await new Promise((resolve) =>
      setTimeout(resolve, DIFF_REQUEST_DELAY_TIME)
    );
  }

  return answer;
};

export { getCommitDiffList, getCommitList };
