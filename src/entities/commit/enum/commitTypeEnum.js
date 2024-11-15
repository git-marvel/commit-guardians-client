/**
 * 검사할 수 있는 커밋 유형을 정의합니다.
 */
const COMMIT_TYPE = {
  remove: {
    type: "remove",
    color: "bg-slate-200 border border-slate-300 text-slate-900",
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
    color: "bg-white border-slate-300 border text-slate-700",
    sameMeaningWords: new Set(["docs", "doc", "documentation", "readme"]),
  },
  style: {
    type: "style",
    color: "bg-orange-100 border border-orange-200 text-orange-700",
    sameMeaningWords: new Set(["style", "format", "beautify", "reformat"]),
  },
  test: {
    type: "test",
    color: "bg-pink-100 border border-pink-200 text-pink-700",
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
