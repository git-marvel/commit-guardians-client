const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const COMMITS_PER_PAGE = 3;

const getCommitList = async ({
  organizationName,
  repositoryName,
  setCommitList,
}) => {
  try {
    const gitcommitResponse = await fetch(
      `https://api.github.com/repos/${organizationName}/${repositoryName}/commits?per_page=${COMMITS_PER_PAGE}&page=1`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      }
    );
    const gitcommitFirstPage = await gitcommitResponse.json();

    const linkHeader = gitcommitResponse.headers.get("Link");
    const lastPageNumber = linkHeader
      ? parseInt(linkHeader.match(/&page=(\d+)>; rel="last"/)?.[1])
      : 1;

    const allCommits = gitcommitFirstPage;

    if (lastPageNumber > 1) {
      const fetchPromises = [];
      for (let page = 2; page <= lastPageNumber; page++) {
        fetchPromises.push(
          fetch(
            `https://api.github.com/repos/${organizationName}/${repositoryName}/commits?per_page=${COMMITS_PER_PAGE}&page=${page}`,
            {
              headers: {
                Authorization: `token ${githubToken}`,
              },
            }
          ).then((res) => res.json())
        );
      }

      allCommits.push((await Promise.all(fetchPromises)).flat());
    }

    setCommitList(allCommits.flat());
  } catch (error) {
    throw new Error(error);
  }
};

export default getCommitList;
