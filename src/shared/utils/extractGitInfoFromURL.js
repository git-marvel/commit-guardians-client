import messages from "../constants/messages";

const extractGitInfoFromURL = (url) => {
  const parsedLink = url.split("/");
  const githubIndex = parsedLink.indexOf("github.com");
  const organizationName = parsedLink[githubIndex + 1];
  const repositoryName = parsedLink[githubIndex + 2];

  if (!organizationName || !repositoryName) {
    throw new Error(messages.errors.invalidURL);
  }

  return { organizationName, repositoryName };
};

export default extractGitInfoFromURL;
