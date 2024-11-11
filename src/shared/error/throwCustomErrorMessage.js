import { ERROR_MESSAGES } from "../constants";

const throwCustomErrorMessage = (error) => {
  switch (error.status) {
    case 403:
    case 429:
      throw new Error(ERROR_MESSAGES.rateLimitExceeded);
    case 404:
      throw new Error(ERROR_MESSAGES.invalidGithubURL);
    default:
      throw new Error(ERROR_MESSAGES.networkError);
  }
};

export default throwCustomErrorMessage;
