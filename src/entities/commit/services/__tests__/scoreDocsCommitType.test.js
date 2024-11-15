import { describe, expect, it } from "vitest";
import scoreDocsCommitType from "../scoreDocsCommitType";
import diffObj from "./diffObj.mock";

describe("scoreDocsCommitType", () => {
  it("변경된 파일이 모두 문서 작업만을 했을 경우 100점을 반환해야 합니다.", () => {
    expect(scoreDocsCommitType(diffObj.allPassed)).toBe(100);
  });

  it("변경된 파일이 모두 문서 작업 파일이 아닐 경우 0점을 반환해야 합니다.", () => {
    expect(scoreDocsCommitType(diffObj.allFailed)).toBe(0);
  });

  it("여러 파일이 있는 경우 유효한 파일에 대해 계산한 점수를 반환해야 합니다.", () => {
    expect(scoreDocsCommitType(diffObj.partialPassed)).toBe(50);
  });

  it("변경사항이 없는 경우 0점을 반환해야 합니다.", () => {
    expect(scoreDocsCommitType({})).toBe(0);
  });
});
