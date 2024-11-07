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
  sentenceCase: {
    type: "sentence-case",
    splitWith: " ",
  },
};

/**
 * simpleText 와 sentenceCase 의 커밋메세지 분할 트리거 문자가 같으므로
 * COMMIT_FORMAT_STYLE.list 에 sentenceCase 는 추가하지 않습니다.
 * 추후, splitWith 문자가 달라진다면, list 에 추가해주세요.
 */
COMMIT_FORMAT_STYLE.list = [
  COMMIT_FORMAT_STYLE.prefix,
  COMMIT_FORMAT_STYLE.simpleText,
  COMMIT_FORMAT_STYLE.templateBased,
];

export default COMMIT_FORMAT_STYLE;
