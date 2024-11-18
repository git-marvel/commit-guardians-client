/**
 * 변경사항이 삭제만 있는지 확인하는 함수입니다.
 * @param {Object} change - 변경사항 객체
 * @returns {boolean} - 삭제만 있는지 여부
 */
const isOnlyDeletionChange = (change) => {
  const hasDeletion = change["-"] !== undefined && change["-"].length > 0;
  const hasNoAddition =
    change["+"] === undefined || change["+"] === null || change["+"] === "";

  return hasDeletion && hasNoAddition;
};

/**
 * 파일별 삭제 점수를 계산하는 함수입니다.
 * @param {Array} changes - 파일의 변경사항 목록
 * @param {string} fileName - 파일 이름
 * @returns {number} - 파일의 삭제 점수
 */
const calculateFileScore = (fileName, changes) => {
  const changesLength = changes.length;

  if (!changes || changesLength === 0) {
    return 0;
  }

  const validDeletionCount = changes.reduce((count, change) => {
    return isOnlyDeletionChange(change) ? count + 1 : count;
  }, 0);

  return Math.floor((validDeletionCount / changesLength) * 100);
};

/**
 * remove 커밋 타입의 변경사항을 검증하고 점수를 합계하고 평균을 내는 함수입니다.
 * @param {Object} diffObj - 변경사항 객체
 * @returns {number} - 최종 점수
 */
const scoreRemoveCommitType = (diffObj) => {
  if (!diffObj || Object.keys(diffObj).length === 0) {
    return 0;
  }

  const validFiles = Object.entries(diffObj).filter(
    ([, changes]) => Array.isArray(changes) && changes.length > 0
  );

  if (validFiles.length === 0) {
    return 0;
  }

  const totalScore = validFiles.reduce((sum, [fileName, changes]) => {
    return sum + calculateFileScore(fileName, changes);
  }, 0);

  return Math.floor(totalScore / validFiles.length);
};

export default scoreRemoveCommitType;
export { calculateFileScore, isOnlyDeletionChange };
