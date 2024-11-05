const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const COMMITS_PER_PAGE = 3;

const getCommitList = async ({
  organizationName,
  repositoryName,
  setCommitList,
}) => {
  const commitListUrl = `https://api.github.com/repos/${organizationName}/${repositoryName}/commits?per_page=${COMMITS_PER_PAGE}`;

  const fetchCommits = async (baseUrl, page) => {
    const gitCommitResponse = await fetch(`${baseUrl}&page=${page}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    });

    return gitCommitResponse;
  };

  try {
    const gitCommitResponse = await fetchCommits(commitListUrl, 1);
    const gitCommitFirstPage = await gitCommitResponse.json();

    const linkHeader = gitCommitResponse.headers.get("Link");
    const lastPageNumber = linkHeader
      ? parseInt(linkHeader.match(/&page=(\d+)>; rel="last"/)?.[1])
      : 1;

    const allCommits = gitCommitFirstPage;

    if (lastPageNumber > 1) {
      const fetchPromises = [];
      for (let page = 2; page <= lastPageNumber; page++) {
        fetchPromises.push(
          fetchCommits(commitListUrl, page).then((res) => res.json())
        );
      }

      allCommits.push((await Promise.all(fetchPromises)).flat());
    }

    setCommitList(allCommits.flat());
    console.log(allCommits);
  } catch (error) {
    throw new Error(error);
  }
};

export default getCommitList;
