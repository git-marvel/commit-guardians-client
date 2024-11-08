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
    diffObj: null,
    numOfFiles: null,
    numOfChanges: null,
  };
};

const makeCommitEntityWithDiff = ({ commit, diffObj }) => {
  commit.diffObj = diffObj;
  commit.numOfFiles = Object.keys(diffObj).length;

  return commit;
};

export { createCommitEntity, makeCommitEntityWithDiff };
