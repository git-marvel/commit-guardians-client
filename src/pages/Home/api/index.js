import { getChanges } from "../../../entities/change/services";
import { GITHUB_TOKEN } from "../../../shared/constants";

const COMMITS_PER_PAGE = 100;
const DIFF_MEDIA_TYPE = "application/vnd.github.diff";

const setCommitBaseUrl = ({ owner, repo }) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;

const fetchWithAuth = async (url, accept = "*/*") => {
  return await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: accept,
    },
  });
};

const getCommitList = async ({ owner, repo }) => {
  const commitListUrl = `${setCommitBaseUrl({ owner, repo })}?per_page=${COMMITS_PER_PAGE}`;

  try {
    const gitCommitResponse = await fetchWithAuth(`${commitListUrl}&page=${1}`);
    const linkHeader = gitCommitResponse.headers.get("Link");
    const lastPageNumber = linkHeader
      ? parseInt(linkHeader.match(/&page=(\d+)>; rel="last"/)?.[1])
      : 1;

    const gitCommitFirstPage = await gitCommitResponse.json();
    const allCommits = gitCommitFirstPage;

    if (lastPageNumber > 1) {
      const fetchPromises = [];

      for (let page = 2; page <= lastPageNumber; page++) {
        const commitPromise = async () => {
          const response = await fetchWithAuth(`${commitListUrl}&page=${page}`);

          return await response.json();
        };

        fetchPromises.push(commitPromise());
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
  const changedCode = await response.text();

  return getChanges(changedCode);
};

const getCommitDiffList = async ({ owner, repo, checkCommitList }) => {
  const fetchPromises = [];
  checkCommitList.forEach((element) => {
    const { sha } = element;
    const commitPromise = async () => {
      const changes = await getCommitDiff({ owner, repo, sha });

      return changes;
    };

    fetchPromises.push(commitPromise());
  });

  return await Promise.all(fetchPromises);
};

export { getCommitList, getCommitDiff, getCommitDiffList };
