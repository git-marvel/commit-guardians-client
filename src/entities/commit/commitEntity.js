import COMMIT_TYPE from "./enum/commitTypeEnum";
import scoreDocsCommitType from "./services/scoreDocsCommitType";
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
  let qualityScore = 0;

  switch (commitType) {
    case COMMIT_TYPE.remove.type: {
      qualityScore = scoreRemoveCommitType(diffObj);
      break;
    }
    case COMMIT_TYPE.docs.type: {
      qualityScore = scoreDocsCommitType(diffObj);
      break;
    }
  }

  commit.qualityScore = qualityScore;
};

export { createCommitEntity, makeCommitEntityWithDiff, setCommitQualityScore };
