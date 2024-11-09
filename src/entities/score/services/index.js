/**
 * @param {Array} scoredCommitList - 점수가 매겨진 commit들의 목록
 * @returns {Object} 100점인 커밋의 개수와 비율을 포함한 객체
 * @returns {number} return.perfectCommitNumber - 점수가 100점인 커밋의 개수
 * @returns {number} return.finalQualityPercent - 전체 커밋 중 완벽한 커밋의 백분율 (0%일 경우 최소 1%로 조정)
 */
const getTotalQualityPercent = (scoredCommitList) => {
  const perfectCommitNumber = scoredCommitList.filter(
    (scoredCommit) => scoredCommit.score === 100
  ).length;
  const totalQualityPercent =
    Math.floor(perfectCommitNumber / scoredCommitList.length) * 100;
  const finalQualityPercent =
    totalQualityPercent === 0 && perfectCommitNumber > 0
      ? 1
      : totalQualityPercent;

  return { perfectCommitNumber, finalQualityPercent };
};

export { getTotalQualityPercent };
