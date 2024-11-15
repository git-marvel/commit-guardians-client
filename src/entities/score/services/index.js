/**
 * @param {Array} commitList - 점수가 매겨진 commit들의 목록
 * @returns {{ numOfPerfectCommits: number, totalScore: number }}
 */
const getCommitSummary = (commitList) => {
  const numOfPerfectCommits = commitList.filter(
    (commit) => commit.qualityScore === 100
  ).length;
  const totalQualityScore = Math.floor(
    (numOfPerfectCommits / commitList.length) * 100
  );
  const totalScore =
    totalQualityScore === 0 && numOfPerfectCommits > 0 ? 1 : totalQualityScore;

  return { numOfPerfectCommits, totalScore };
};

export { getCommitSummary };
