import COMMIT_TYPE from "./enum/commitTypeEnum";
import scoreRemoveCommitType from "./services/scoreRemoveCommitType";

/**
 * @param {{
 * type: COMMIT_TYPE.type,
 * sha: string,
 * url: string,
 * author: {date: string, email: string, name: string},
 * message: string,
 * diffObj: {"FILE_NAME.example": [{"+": string, "-": string}, ...]},
 * numOfFiles: number,
 * numOfChanges: number,
 * qualityScore: number,
 * }}
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
    qualityScore: null,
  };
};

const makeCommitEntityWithDiff = ({ commit, diffObj }) => {
  commit.diffObj = diffObj;
  commit.numOfFiles = Object.keys(diffObj).length;

  return commit;
};

const setCommitQualityScore = ({ commit, commitType, diffObj }) => {
  switch (commitType) {
    case COMMIT_TYPE.remove.type: {
      const qualityScore = scoreRemoveCommitType(diffObj); // remove 에 따른 점수가
      commit.qualityScore = qualityScore;
      break;
    }
    default:
      return 0;
  }
};

export { createCommitEntity, makeCommitEntityWithDiff, setCommitQualityScore };
