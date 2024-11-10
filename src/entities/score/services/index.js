/**
 * @param {Array} scoredCommitList - 점수가 매겨진 commit들의 목록
 * @returns {{ perfectCommitNumber: number, finalQualityPercent: number }}
 */
const getTotalQualityPercent = (scoredCommitList) => {
  const perfectCommitNumber = scoredCommitList.filter(
    (scoredCommit) => scoredCommit.score === 100
  ).length;
  const totalQualityPercent = Math.floor(
    (perfectCommitNumber / scoredCommitList.length) * 100
  );
  const finalQualityPercent =
    totalQualityPercent === 0 && perfectCommitNumber > 0
      ? 1
      : totalQualityPercent;

  return { perfectCommitNumber, finalQualityPercent };
};

export { getTotalQualityPercent };
