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

const isDocsFile = (filePath) => {
  return DOCS_TYPE_FILENAME_EXTENSIONS.some((extension) =>
    filePath.endsWith(extension)
  );
};

/**
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} commitScore - 최종 점수
 */
const scoreDocsCommitType = (diffObj) => {
  const totalFiles = Object.keys(diffObj);

  if (totalFiles.length === 0) {
    return 0;
  }

  const passedFilesCount = totalFiles.reduce((count, filePath) => {
    return isDocsFile(filePath) ? count + 1 : count;
  }, 0);

  const commitScore = Math.floor((passedFilesCount / totalFiles.length) * 100);

  return commitScore;
};

export default scoreDocsCommitType;
