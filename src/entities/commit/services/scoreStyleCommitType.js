import DiffMatchPatch from "diff-match-patch";

const STYLE_FILE_NAME_WORDS = ["prettier", "eslint", "config"];
const CLASS_NAME_REGEX = /className="([^"]*)"/;
const OBJECT_PARAMS_REGEX = /\{\s([^}]*)\s\}/;
const SPECIAL_CHARS_REGEX = /^([;,'"\n\s]|\n[+-]|[+-]\n)*$/g;

const isStyleFile = (filePath) => {
  const fileName = filePath.split("/").pop().toLowerCase();

  return STYLE_FILE_NAME_WORDS.some((word) => fileName.includes(word));
};

const containsConsole = (string) => {
  return string.includes("console");
};

const extractPattern = (text, pattern) => {
  const match = text.match(pattern);
  if (!match) {
    return { extracted: "", remaining: text };
  }

  const extracted = match[1];
  const remaining = text.replace(pattern, "").trim();

  return { extracted, remaining };
};

const hasIdenticalClasses = ({ stringAdded, stringRemoved }) => {
  const classAdded = extractPattern(stringAdded, CLASS_NAME_REGEX);
  const classRemoved = extractPattern(stringRemoved, CLASS_NAME_REGEX);

  if (classAdded.extracted === classRemoved.extracted) {
    return {
      identical: true,
      stringAdded: classAdded.remaining,
      stringRemoved: classRemoved.remaining,
    };
  }

  const addClasses = new Set(classAdded.extracted.split(" "));
  const removeClasses = classRemoved.extracted.split(" ");

  const isIdentical =
    removeClasses.every((className) => addClasses.has(className)) &&
    addClasses.size === removeClasses.length;

  return {
    identical: isIdentical,
    stringAdded: classAdded.remaining,
    stringRemoved: classRemoved.remaining,
  };
};

const hasIdenticalObjectParams = ({ stringAdded, stringRemoved }) => {
  const objectAdded = extractPattern(stringAdded, OBJECT_PARAMS_REGEX);
  const objectRemoved = extractPattern(stringRemoved, OBJECT_PARAMS_REGEX);

  if (objectAdded.extracted === objectRemoved.extracted) {
    return {
      identical: true,
      stringAdded: objectAdded.remaining,
      stringRemoved: objectRemoved.remaining,
    };
  }

  const addParams = new Set(objectAdded.extracted.split(", "));
  const removeParams = objectRemoved.extracted.split(", ");

  const isIdentical =
    removeParams.every((param) => addParams.has(param)) &&
    addParams.size === removeParams.length;

  return {
    identical: isIdentical,
    stringAdded: objectAdded.remaining,
    stringRemoved: objectRemoved.remaining,
  };
};

const containsOnlySpecialChars = (text) => SPECIAL_CHARS_REGEX.test(text);

const isStyleChange = (change) => {
  const stringAdded = change["+"].slice(1);
  const stringRemoved = change["-"].slice(1);
  const dmp = new DiffMatchPatch();
  const diffs = dmp
    .diff_main(stringAdded, stringRemoved)
    .filter(([type]) => type !== 0);

  const isValidDiff = (text) =>
    containsOnlySpecialChars(text) || containsConsole(text);

  if (diffs.every(([, text]) => isValidDiff(text))) {
    return true;
  }

  const classComparison = hasIdenticalClasses({ stringAdded, stringRemoved });
  if (!classComparison.identical) {
    return false;
  }

  const paramComparison = hasIdenticalObjectParams(classComparison);
  if (!paramComparison.identical) {
    return false;
  }

  const remainingDiffs = dmp
    .diff_main(paramComparison.stringAdded, paramComparison.stringRemoved)
    .filter(([type]) => type !== 0);

  return remainingDiffs.every(([, text]) => isValidDiff(text));
};

/**
 * 파일별 삭제 점수를 계산하는 함수입니다.
 * @param {Array} changes - 파일의 변경사항 목록
 * @param {string} fileName - 파일 이름
 * @returns {number} - 파일의 삭제 점수
 */
const calculateFileScore = (fileName, changes) => {
  if (!changes.length) {
    return 0;
  }

  if (isStyleFile(fileName)) {
    return 100;
  }

  const validChanges = changes.reduce((count, change) => {
    return isStyleChange(change) ? count + 1 : count;
  }, 0);

  return Math.floor((validChanges / changes.length) * 100);
};

/**
 * style 커밋 타입의 변경사항을 검증하고 점수를 합계하고 평균을 내는 함수입니다.
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} - 최종 점수
 */
const scoreStyleCommit = (diffObj) => {
  const fileEntries = Object.entries(diffObj).filter(
    ([, changes]) => changes.length > 0
  );

  if (!fileEntries.length) {
    return 0;
  }

  const totalScore = fileEntries.reduce((sum, [fileName, changes]) => {
    return sum + calculateFileScore(fileName, changes);
  }, 0);

  return Math.floor(totalScore / fileEntries.length);
};

export default scoreStyleCommit;
