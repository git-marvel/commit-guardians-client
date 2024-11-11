const TEST_TYPE_FILENAME_EXTENSIONS = new Set(["test", "spec", "mock"]);

/**
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} commitScore - 최종 점수
 */
const scoreTestCommitType = (diffObj) => {
  const passedFilesCount = Object.keys(diffObj).filter((filePath) => {
    const fileName = filePath.slice(filePath.lastIndexOf("/") + 1);

    const hasTestFileExtension = fileName
      .split(".")
      .some((name) => TEST_TYPE_FILENAME_EXTENSIONS.has(name));

    return hasTestFileExtension;
  }).length;

  const commitScore = Math.floor(
    (passedFilesCount / Object.keys(diffObj).length) * 100
  );

  return commitScore;
};

export default scoreTestCommitType;
