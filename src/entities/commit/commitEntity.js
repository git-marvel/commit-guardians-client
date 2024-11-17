import COMMIT_TYPE from "./enum/commitTypeEnum";
import scoreDocsCommitType from "./services/scoreDocsCommitType";
import scoreRemoveCommitType from "./services/scoreRemoveCommitType";
import scoreStyleCommitType from "./services/scoreStyleCommitType";
import scoreTestCommitType from "./services/scoreTestCommitType";

/**
 * @param {{
 * formatStyle: COMMIT_FORMAT_STYLE.type,
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
const createCommitEntity = ({
  formatStyle,
  type,
  sha,
  url,
  author,
  message,
}) => {
  return {
    formatStyle,
    type,
    sha,
    url,
    message,
    author,
    diffObj: null,
    numOfFiles: null,
    numOfChanges: null,
    qualityScore: null,
  };
};

const makeCommitEntityWithDiff = ({ commit, diffObj }) => {
  const numOfFiles = Object.keys(diffObj).length;
  const numOfChanges = Object.values(diffObj).reduce(
    (total, changes) => total + changes.length,
    0
  );

  return {
    ...commit,
    diffObj,
    numOfFiles,
    numOfChanges,
  };
};

const setCommitQualityScore = ({ commit, commitType, diffObj }) => {
  const getCommitQualityScore = (commitType) => {
    switch (commitType) {
      case COMMIT_TYPE.remove.type:
        return scoreRemoveCommitType(diffObj);
      case COMMIT_TYPE.docs.type:
        return scoreDocsCommitType(diffObj);
      case COMMIT_TYPE.test.type:
        return scoreTestCommitType(diffObj);
      case COMMIT_TYPE.style.type:
        return scoreStyleCommitType(diffObj);
      default:
        return 0;
    }
  };

  commit.qualityScore = getCommitQualityScore(commitType);
};

export { createCommitEntity, makeCommitEntityWithDiff, setCommitQualityScore };
