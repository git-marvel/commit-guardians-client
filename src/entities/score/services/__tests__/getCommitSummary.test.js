import { describe, expect, it } from "vitest";
import { getCommitSummary } from "..";

describe("getCommitSummary", () => {
  it("커밋 목록들을 받아서, 전체 점수와 100점인 커밋갯수를 올바르게 계산할 수 있어야한다.", () => {
    const commitList = [
      { qualityScore: 100 },
      { qualityScore: 90 },
      { qualityScore: 100 },
    ];

    const result = getCommitSummary(commitList);

    expect(result).toEqual({
      numOfPerfectCommits: 2,
      totalScore: 96, // (100 + 90 + 100) / 3 = 96.666 => 96
    });
  });

  it("검사한 모든 커밋목록들이 100점이라면, 총 점수는 100점이어야 한다.", () => {
    const commitList = [
      { qualityScore: 100 },
      { qualityScore: 100 },
      { qualityScore: 100 },
    ];

    const result = getCommitSummary(commitList);

    expect(result).toEqual({
      numOfPerfectCommits: 3,
      totalScore: 100,
    });
  });

  it("커밋목록들 중에, 100점인 커밋이 하나도 없어도 점수를 낼 수 있어야 한다.", () => {
    const commitList = [
      { qualityScore: 50 },
      { qualityScore: 75 },
      { qualityScore: 25 },
    ];

    const result = getCommitSummary(commitList);

    expect(result).toEqual({
      numOfPerfectCommits: 0,
      totalScore: 50,
    });
  });

  it("하나만 100점이었고, 총점이 소수점 내림으로 인해 0점이 된 경우에는 총점 1점으로 간주한다.", () => {
    const generateZeroScore = (number) => {
      const list = [];
      for (let i = 0; i < number; i++) {
        list.push({ qualityScore: 0 });
      }
      return list;
    };

    const allCommits = generateZeroScore(100);
    allCommits.push({ qualityScore: 100 });
    const result = getCommitSummary(allCommits);

    expect(result).toEqual({
      numOfPerfectCommits: 1,
      totalScore: 1,
    });
  });
});
