const TEST_TYPE_VALIDATED_KEYWORDS = ["test", "tests", "spec", "mock"];

/**
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} commitScore - 최종 점수
 */
const scoreTestCommitType = (diffObj) => {
  const passedFilesCount = Object.keys(diffObj).filter((filePath) => {
    const separatedFileNames = filePath
      .substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."))
      .toLowerCase()
      .split(".");

    for (const name of separatedFileNames) {
      const isTestType = TEST_TYPE_VALIDATED_KEYWORDS.some((extension) =>
        name.endsWith(extension)
      );

      if (isTestType) {
        return isTestType;
      }
    }

    return false;
  }).length;

  const commitScore = Math.floor(
    (passedFilesCount / Object.keys(diffObj).length) * 100
  );

  return commitScore;
};

export default scoreTestCommitType;
