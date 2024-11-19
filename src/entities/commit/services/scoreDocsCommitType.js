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
  ".txt",
];

const DOCS_COMMENTS = ["/** ", "* ", "/// "];

const isDocsFile = (filePath) => {
  return DOCS_TYPE_FILENAME_EXTENSIONS.some((extension) =>
    filePath.endsWith(extension)
  );
};

const isDocsComments = (change) => {
  const keyOfEmptyValue =
    change["+"] === "" && change["-"] === ""
      ? false
      : change["+"] === ""
        ? "+"
        : change["-"] === ""
          ? "-"
          : true;

  if (keyOfEmptyValue === false) {
    return false;
  }

  return DOCS_COMMENTS.some((comment) => {
    switch (keyOfEmptyValue) {
      case "+":
        return change["-"].startsWith(comment, 2);
      case "-":
        return change["+"].startsWith(comment, 2);
      default:
        return (
          change["+"].startsWith(comment, 2) &&
          change["-"].startsWith(comment, 2)
        );
    }
  });
};

const calculateFileScore = (filePath, changes) => {
  if (isDocsFile(filePath)) {
    return 100;
  } else if (changes.length === 0) {
    return 0;
  }

  const validChanges = changes.reduce((count, change) => {
    return isDocsComments(change) ? count + 1 : count;
  }, 0);

  return Math.floor((validChanges / changes.length) * 100);
};

/**
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} commitScore - 최종 점수
 */
const scoreDocsCommitType = (diffObj) => {
  const totalFiles = Object.entries(diffObj);

  if (!totalFiles.length) {
    return 0;
  }

  const totalScore = totalFiles.reduce((sum, [filePath, changes]) => {
    return sum + calculateFileScore(filePath, changes);
  }, 0);

  const commitScore = Math.floor(totalScore / totalFiles.length);

  return commitScore;
};

export default scoreDocsCommitType;
