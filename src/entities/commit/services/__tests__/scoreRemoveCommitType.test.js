import { describe, expect, it } from "vitest";
import scoreRemoveCommitType, {
  calculateFileScore,
  calculateModuleFileDeletions,
  isOnlyDeletionChange,
} from "../scoreRemoveCommitType";

// 모듈 파일의 유효한 삭제 변경사항 개수를 계산하는 함수에 대한 테스트
describe("calculateModuleFileDeletions", () => {
  const changes = [
    { "-": "minus library", "+": "" },
    { "-": "minus library2", "+": "" },
  ];

  it("JSON 파일일 경우 changes를 반환해야 합니다.", () => {
    expect(calculateModuleFileDeletions("test.json", changes)).toBe(
      changes.length
    );
  });

  it("YAML 파일일 경우 true를 반환해야 합니다.", () => {
    expect(calculateModuleFileDeletions("test.yaml", changes)).toBe(
      changes.length
    );
  });

  it("모듈 파일이 아닐 경우 undefined를 반환해야 합니다.", () => {
    expect(calculateModuleFileDeletions("test.js", changes)).toBe(undefined);
    expect(calculateModuleFileDeletions("test.ts", changes)).toBe(undefined);
  });
});

// 삭제만 있는 변경사항인지 확인하는 함수에 대한 테스트
describe("isOnlyDeletionChange", () => {
  it("삭제만 있는 변경사항일 경우 true를 반환해야 합니다.", () => {
    const change = { "-": "deleted content" };
    expect(isOnlyDeletionChange(change)).toBe(true);
  });

  it("추가 변경사항일 경우 false를 반환해야 합니다.", () => {
    const change = { "+": "added content" };
    expect(isOnlyDeletionChange(change)).toBe(false);
  });

  it("삭제와 추가가 모두 포함된 경우 false를 반환해야 합니다.", () => {
    const change = { "-": "deleted content", "+": "added content" };
    expect(isOnlyDeletionChange(change)).toBe(false);
  });
});

// 파일별 삭제 점수를 계산하는 함수에 대한 테스트
describe("calculateFileScore", () => {
  it("모든 변경사항이 유효한 삭제일 경우 100% 점수를 반환해야 합니다.", () => {
    const changes = [{ "-": "deleted content" }, { "-": "deleted content" }];
    expect(calculateFileScore("test.jsx", changes)).toBe(100);
  });

  it("삭제된 변경사항이 없을 경우 0% 점수를 반환해야 합니다.", () => {
    const changes = [{ "+": "added content" }, { "+": "added content" }];
    expect(calculateFileScore("test.jsx", changes)).toBe(0);
  });

  it("절반의 변경사항만 유효한 삭제일 경우 50% 점수를 반환해야 합니다.", () => {
    const changes = [
      { "-": "deleted content" },
      { "+": "added content" },
      { "-": "deleted content", "+": "added content" },
    ];
    expect(calculateFileScore("test.jsx", changes)).toBe(33);
  });
});

// remove 커밋 타입의 변경사항을 검증하고 점수를 계산하는 함수에 대한 통합 테스트
describe("scoreRemoveCommitType", () => {
  it("여러 파일에 대해 정확한 점수를 계산해야 합니다.", () => {
    const diffObj = {
      "file1.json": [{ "-": "deleted content" }, { "+": "added content" }],
      "file2.yaml": [
        { "-": "deleted content" },
        { "-": "deleted content" },
        { "+": "added content" },
      ],
    };
    expect(scoreRemoveCommitType(diffObj)).toBe(58);
  });

  it("변경사항이 없는 경우 0 점수를 반환해야 합니다.", () => {
    const diffObj = {
      "file1.json": [],
      "file2.yaml": [],
    };
    expect(scoreRemoveCommitType(diffObj)).toBe(0);
  });

  it("모든 파일이 비어 있는 경우를 올바르게 처리해야 합니다.", () => {
    const diffObj = {};
    expect(scoreRemoveCommitType(diffObj)).toBe(0);
  });
});
