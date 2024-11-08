/**
 * @param {{type: COMMIT_TYPE.type,
 *          sha: string,
 *          url: string,
 *          author: {date: string, email: string, name: string},
 *          message: string}}
 */
const createCommitEntity = ({ type, sha, url, author, message }) => {
  return {
    type: type,
    sha: sha,
    url: url,
    message: message,
    author: author,
    numOfChanges: null,
    numOfFiles: null,
    diffObj: null,
  };
};

export { createCommitEntity };
