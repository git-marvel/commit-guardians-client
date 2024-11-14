const DOCS_TYPE_FILENAME_EXTENSIONS = [
  ".docs",
  ".md",
  ".mdx",
  ".rst",
  ".img",
  ".png",
  ".jpeg",
  ".svg",
  ".ai",
  ".pdf",
];

/**
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} commitScore - 최종 점수
 */
const scoreDocsCommitType = (diffObj) => {
  if (!diffObj || Object.keys(diffObj).length === 0) {
    return 0;
  }

  const passedFilesCount = Object.keys(diffObj).filter((filePath) => {
    return DOCS_TYPE_FILENAME_EXTENSIONS.some((extension) =>
      filePath.endsWith(extension)
    );
  }).length;

  const commitScore = Math.floor(
    (passedFilesCount / Object.keys(diffObj).length) * 100
  );

  return commitScore;
};

export default scoreDocsCommitType;
