import { ERROR_MESSAGES } from "../constants";

const throwFetchErrorMessage = (error) => {
  switch (error.status) {
    case 403:
    case 429:
      throw new Error(ERROR_MESSAGES.rateLimitExceeded);
    case 404:
      throw new Error(ERROR_MESSAGES.invalidGithubURL);
    case 500:
      throw new Error(ERROR_MESSAGES.networkError);
    default:
      throw error;
  }
};

export default throwCustomErrorMessage;
