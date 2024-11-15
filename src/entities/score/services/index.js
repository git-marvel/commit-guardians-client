/**
 * @param {Array} commitList - 점수가 매겨진 commit들의 목록
 * @returns {{ numOfPerfectCommits: number, totalScore: number }}
 */
const getCommitSummary = (commitList) => {
  let numOfPerfectCommits = 0;
  let totalScoreSum = 0;

  commitList.forEach((commit) => {
    if (commit.qualityScore === 100) {
      numOfPerfectCommits++;
    }
    totalScoreSum += commit.qualityScore;
  });

  const totalQualityScore = Math.floor(totalScoreSum / commitList.length);
  const totalScore =
    totalQualityScore === 0 && numOfPerfectCommits > 0 ? 1 : totalQualityScore;

  return { numOfPerfectCommits, totalScore };
};

export { getCommitSummary };
