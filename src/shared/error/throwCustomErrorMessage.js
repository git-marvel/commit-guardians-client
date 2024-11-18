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

const throwIndexedDBErrorMessage = (error) => {
  if (error instanceof DOMException) {
    switch (error.name) {
      case "QuotaExceededError":
        throw new Error(ERROR_MESSAGES.idbQuotaExceededError);
      case "InvalidStateError":
        throw new Error(ERROR_MESSAGES.idbInvalidStateError);
      case "AbortError":
        throw new Error(ERROR_MESSAGES.idbAbortError);
      case "UnknownError":
        throw new Error(ERROR_MESSAGES.idbUnknownError);
      default:
        throw new Error(`IndexedDB Error: ${error.message}`);
    }
  } else {
    throw new Error(`Unexpected Error: ${error.message || error}`);
  }
};

export { throwFetchErrorMessage, throwIndexedDBErrorMessage };
