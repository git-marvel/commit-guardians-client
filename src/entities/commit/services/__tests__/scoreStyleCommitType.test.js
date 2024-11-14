import { describe, expect, it } from "vitest";
import scoreStyleCommit from "../scoreStyleCommitType";

describe("scoreStyleCommit", () => {
  it("파일이름에 prettier가 포함된 경우 100점을 반환해야 합니다.", () => {
    const diffObj = {
      "prettierrc.json": [{ "-": "-deleted content" }],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("파일이름에 eslint가 포함된 경우 100점을 반환해야 합니다.", () => {
    const diffObj = {
      "eslintrc.json": [{ "-": "-deleted content" }],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("파일이름에 config가 포함된 경우 100점을 반환해야 합니다.", () => {
    const diffObj = {
      "postcss.config.json": [{ "-": "-deleted content" }],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("변경된 문자열이 console과 관련된 내용뿐일 경우 100점을 반환해야 합니다.", () => {
    const diffObj = {
      "src/pages/Home/api/getCommitList.js": [
        { "+": "+", "-": "-console.log(allCommits);" },
      ],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("변경된 문자열이 style과 관련된 특수문자뿐일 경우 100점을 반환해야 합니다.", () => {
    const diffObj = {
      "src/pages/Home/api/getCommitList.js": [
        {
          "+": `+<button type="submit">api 요청</button>;`,
          "-": `-<button type="submit">api 요청</button>`,
        },
      ],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("변경된 문자열이 tailwind className의 class들 순서만 변경했다면 100점을 반환해야 합니다", () => {
    const diffObj = {
      "src/pages/Home/api/getCommitList.js": [
        {
          "+": `+<div className="w-1/2 my-5">`,
          "-": `-<div className="my-5 w-1/2">`,
        },
      ],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("변경된 문자열이 객체 property들의 순서만 변경했다면 100점을 반환해야 합니다.", () => {
    const diffObj = {
      "src/pages/Home/api/getCommitList.js": [
        {
          "+": `+import { createJSONStorage, persist } from "zustand/middleware";`,
          "-": `-import { persist, createJSONStorage } from "zustand/middleware";`,
        },
      ],
    };
    expect(scoreStyleCommit(diffObj)).toBe(100);
  });

  it("여러 파일에 대해 정확한 점수를 계산해야 합니다.", () => {
    const diffObj = {
      "file1.json": [{ "-": "-const a = 1", "+": "+const b = 1" }],
      "file2.yaml": [
        {
          "+": `+<div className="w-1/2 my-5">`,
          "-": `-<div className="my-5 w-1/2">`,
        },
      ],
    };
    expect(scoreStyleCommit(diffObj)).toBe(50);
  });

  it("변경사항이 없는 경우 0 점수를 반환해야 합니다.", () => {
    const diffObj = {
      "file1.json": [],
      "file2.yaml": [],
    };
    expect(scoreStyleCommit(diffObj)).toBe(0);
  });

  it("모든 파일이 비어 있는 경우를 올바르게 처리해야 합니다.", () => {
    const diffObj = {};
    expect(scoreStyleCommit(diffObj)).toBe(0);
  });
});
