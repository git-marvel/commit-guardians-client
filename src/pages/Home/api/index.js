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

const getCommitList = async ({
  organizationName,
  repositoryName,
  setCommitList,
}) => {
  const commitListUrl = `${setCommitBaseUrl({ owner: organizationName, repo: repositoryName })}?per_page=${COMMITS_PER_PAGE}`;

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

    const filterCommitsInfo = allCommits.flat().map((element) => {
      const { sha, url, commit } = element;
      const { author, message } = commit;

      return {
        sha,
        url,
        author,
        message,
      };
    });

    setCommitList(filterCommitsInfo);
  } catch (error) {
    throw new Error(error);
  }
};

const getCommitDiff = async ({ owner, repo, ref }) => {
  const commitUrl = `${setCommitBaseUrl({ owner, repo })}/${ref}`;

  const response = await fetchWithAuth(commitUrl, DIFF_MEDIA_TYPE);
  const changedCode = await response.text();

  return getChanges(changedCode);
};

export { getCommitList, getCommitDiff };
