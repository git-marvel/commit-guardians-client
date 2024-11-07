import { ERROR_MESSAGES } from "../constants";

const extractGitInfoFromURL = (url) => {
  const parsedLink = url.split("/");
  const githubIndex = parsedLink.indexOf("github.com");
  const owner = parsedLink[githubIndex + 1];
  const repo = parsedLink[githubIndex + 2];

  if (!owner || !repo) {
    throw new Error(ERROR_MESSAGES.invalidURL);
  }

  return { owner, repo };
};

export default extractGitInfoFromURL;
