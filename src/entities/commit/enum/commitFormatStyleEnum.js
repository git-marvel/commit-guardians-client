/**
 * 가장 흔한 커밋 메세지 형식의 종류를 정의합니다.
 */
const COMMIT_FORMAT_STYLE = {
  prefix: {
    type: "prefix-style",
    splitWith: ":",
  },
  simpleText: {
    type: "simple-text-style",
    splitWith: " ",
  },
  templateBased: {
    type: "template-based",
    splitWith: "]",
  },
};

COMMIT_FORMAT_STYLE.list = [
  COMMIT_FORMAT_STYLE.prefix,
  COMMIT_FORMAT_STYLE.simpleText,
  COMMIT_FORMAT_STYLE.templateBased,
];

export default COMMIT_FORMAT_STYLE;
