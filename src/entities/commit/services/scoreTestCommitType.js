const TEST_TYPE_VALIDATED_KEYWORDS = ["test", "tests", "spec", "mock"];

const isTestFile = (partOfFileName) => {
  return TEST_TYPE_VALIDATED_KEYWORDS.some((extension) =>
    partOfFileName.endsWith(extension)
  );
};

/**
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} commitScore - 최종 점수
 */
const scoreTestCommitType = (diffObj) => {
  const totalFiles = Object.keys(diffObj);

  if (totalFiles.length === 0) {
    return 0;
  }

  const passedFilesCount = totalFiles.reduce((count, filePath) => {
    const fileName = filePath
      .substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."))
      .toLowerCase();

    return isTestFile(fileName) || fileName.split(".").some(isTestFile)
      ? count + 1
      : count;
  }, 0);

  const commitScore = Math.floor((passedFilesCount / totalFiles.length) * 100);

  return commitScore;
};

export default scoreTestCommitType;
