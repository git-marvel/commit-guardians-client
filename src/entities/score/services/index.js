/**
 * @param {Array} commitList - 점수가 매겨진 commit들의 목록
 * @returns {{ numOfPerfectCommits: number, totalScore: number }}
 */
const getCommitSummary = (commitList) => {
  const { numOfPerfectCommits, totalScoreSum } = commitList.reduce(
    (acc, commit) => {
      if (commit.qualityScore === 100) {
        acc.numOfPerfectCommits++;
      }
      acc.totalScoreSum += commit.qualityScore;
      return acc;
    },
    { numOfPerfectCommits: 0, totalScoreSum: 0 }
  );

  const totalQualityScore = Math.floor(totalScoreSum / commitList.length);
  const totalScore =
    totalQualityScore === 0 && numOfPerfectCommits > 0 ? 1 : totalQualityScore;

  return { numOfPerfectCommits, totalScore };
};

export { getCommitSummary };
