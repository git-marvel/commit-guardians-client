/**
 * 검사할 수 있는 커밋 유형을 정의합니다.
 */
const COMMIT_TYPE = {
  remove: {
    type: "remove",
    sameMeaningWords: new Set([
      "remove",
      "removed",
      "removes",
      "delete",
      "deletes",
      "deleted",
      "erase",
      "erases",
      "erased",
      "discard",
    ]),
  },
  docs: {
    type: "docs",
    sameMeaningWords: new Set(["docs", "doc", "documentation", "readme"]),
  },
  style: {
    type: "style",
    sameMeaningWords: new Set(["style", "format", "beautify", "reformat"]),
  },
  test: {
    type: "test",
    sameMeaningWords: new Set(["test", "tests", "verify", "unittest"]),
  },
};

COMMIT_TYPE.list = [
  COMMIT_TYPE.remove,
  COMMIT_TYPE.docs,
  COMMIT_TYPE.style,
  COMMIT_TYPE.test,
];

export default COMMIT_TYPE;
