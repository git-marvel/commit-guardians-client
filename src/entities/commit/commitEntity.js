/**
 * github 에서 주는 커밋내용을 받아서,
 * 커밋 타입을 포함한 커밋 엔티티를 반환합니다.
 *
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
