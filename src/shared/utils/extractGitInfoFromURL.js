import { ERROR_MESSAGES } from "../constants";

const extractGitInfoFromURL = (url) => {
  const parsedLink = url.split("/");
  const githubIndex = parsedLink.indexOf("github.com");
  const organizationName = parsedLink[githubIndex + 1];
  const repositoryName = parsedLink[githubIndex + 2];

  if (!organizationName || !repositoryName) {
    throw new Error(ERROR_MESSAGES.invalidURL);
  }

  return { organizationName, repositoryName };
};

export default extractGitInfoFromURL;
