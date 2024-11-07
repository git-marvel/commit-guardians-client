import axios from "axios";
import { getChanges } from "../../../entities/change/services";
import { GITHUB_TOKEN } from "../../../shared/constants";

const COMMITS_PER_PAGE = 100;
const DIFF_MEDIA_TYPE = "application/vnd.github.diff";

const setCommitBaseUrl = ({ owner, repo }) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;

const fetchWithAuth = async (url, accept = "*/*") => {
  return await axios.get(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: accept,
    },
  });
};

const getCommitList = async ({ owner, repo }) => {
  const commitListUrl = `${setCommitBaseUrl({ owner, repo })}?per_page=${COMMITS_PER_PAGE}`;

  try {
    const gitCommitFirstPage = await fetchWithAuth(
      `${commitListUrl}&page=${1}`
    );
    const linkHeader = gitCommitFirstPage.headers["Link"];
    const lastPageNumber = linkHeader
      ? parseInt(linkHeader.match(/&page=(\d+)>; rel="last"/)?.[1])
      : 1;

    const allCommits = gitCommitFirstPage.data;

    if (lastPageNumber > 1) {
      const fetchPromises = [];

      for (let page = 2; page <= lastPageNumber; page++) {
        const commitPagePromise = async () => {
          const commitPage = await fetchWithAuth(
            `${commitListUrl}&page=${page}`
          );
          return commitPage.data;
        };

        fetchPromises.push(commitPagePromise());
      }

      allCommits.push((await Promise.all(fetchPromises)).flat());
    }

    return allCommits.flat();
  } catch (error) {
    throw new Error(error);
  }
};

const getCommitDiff = async ({ owner, repo, sha }) => {
  const commitUrl = `${setCommitBaseUrl({ owner, repo })}/${sha}`;

  const response = await fetchWithAuth(commitUrl, DIFF_MEDIA_TYPE);
  const changedCode = response.data;

  return getChanges(changedCode);
};
const getCommitDiffList = async ({ owner, repo, commitsToCheck }) => {
  const fetchPromises = commitsToCheck.map(async (commit) => {
    const { sha } = commit;
    commit.diffObj = await getCommitDiff({ owner, repo, sha });

    return commit;
  });

  return await Promise.all(fetchPromises);
};

export { getCommitDiffList, getCommitList };
