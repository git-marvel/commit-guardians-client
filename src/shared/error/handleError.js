import { ERROR_MESSAGES } from "../constants";

const handleError = (error) => {
  if (error.status === 403 || error.status === 429) {
    throw new Error(ERROR_MESSAGES.rateLimitExceeded);
  }
  if (error.status === 404) {
    throw new Error(ERROR_MESSAGES.invalidGithubURL);
  }

  throw new Error(ERROR_MESSAGES.networkError);
};

export default handleError;
