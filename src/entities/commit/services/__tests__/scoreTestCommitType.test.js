import { describe, expect, it } from "vitest";
import scoreTestCommitType from "../scoreTestCommitType";

describe("scoreTestCommitType", () => {
  it(`검증 키워드("test", "tests", "spec", "mock")가 파일 이름의 끝에 포함된 경우 점수를 반환해야 합니다.`, () => {
    const diffObj = {
      "a/PostInfoContent.test.tsx.snap": [{ "-": "", "+": "" }],
      "a/ResultServiceTest.java": [{ "-": "", "+": "" }],
      "a/repository_imp_test.dart": [{ "-": "", "+": "" }],
      "a/ui2.tests.ts": [{ "-": "", "+": "" }],
      "a/vscode-mock.ts": [{ "-": "", "+": "" }],
      "a/e2e\\spec.cy.js": [{ "-": "", "+": "" }],
    };

    expect(scoreTestCommitType(diffObj)).toBe(100);
  });

  it("검증 키워드가 파일 이름의 끝이 아닌 부분에 있는 경우 0점을 반환해야 합니다.", () => {
    const diffObj = {
      "a/mock_feed_repository_impl.dart": [{ "-": "", "+": "" }],
      "a/test_inadvertent_creation.rb": [{ "-": "", "+": "" }],
      "a/use_case/tests_user_page_use_case.dart": [{ "-": "", "+": "" }],
    };

    expect(scoreTestCommitType(diffObj)).toBe(0);
  });

  it("검증 키워드가 없는 변경사항일 경우 0점을 반환해야 합니다.", () => {
    const diffObj = {
      "a/src/compiler-worker.ts": [{ "-": "", "+": "" }],
      "a/packages/jest-react/src/internalAct.js": [{ "-": "", "+": "" }],
    };

    expect(scoreTestCommitType(diffObj)).toBe(0);
  });

  it("변경사항이 없는 경우 0점을 반환해야 합니다.", () => {
    expect(scoreTestCommitType({})).toBe(0);
  });
});
