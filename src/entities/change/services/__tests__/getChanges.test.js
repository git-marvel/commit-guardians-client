import { describe, expect, it } from "vitest";
import { getChanges } from "../index";
import { diffPerCommit } from "./diffPerCommit.mock.js";

describe("getChanges", () => {
  it("커밋 내용 변경점은 file 확장자를 key 값인 객체 형태로 저장할 수 있어야 한다.", () => {
    const result = getChanges(diffPerCommit);

    expect(typeof result).toBe("object");

    expect(Object.keys(result)).toHaveLength(2);

    expect(Object.keys(result)).toEqual([
      "a/docs/api/en/renderers/WebGLRenderer.html",
      "a/src/renderers/WebGLRenderer.js",
    ]);
  });

  it("파일명인 key 의 value 는 change 의 배열들이어야 한다.", () => {
    const result = getChanges(diffPerCommit);

    const htmlChanges = result["a/docs/api/en/renderers/WebGLRenderer.html"];
    expect(Array.isArray(htmlChanges)).toBe(true);
    expect(htmlChanges).toHaveLength(1);

    const jsChanges = result["a/src/renderers/WebGLRenderer.js"];
    expect(Array.isArray(jsChanges)).toBe(true);
    expect(jsChanges.length).toBeGreaterThan(0);
  });

  it("change 는 + 와 - 의 .", () => {
    const result = getChanges(diffPerCommit);

    const htmlChanges = result["a/docs/api/en/renderers/WebGLRenderer.html"];
    const jsChanges = result["a/src/renderers/WebGLRenderer.js"];

    htmlChanges.forEach((change) => {
      expect(change).toHaveProperty("-");
      expect(change).toHaveProperty("+");
    });

    jsChanges.forEach((change) => {
      expect(change).toHaveProperty("-");
      expect(change).toHaveProperty("+");
    });
  });
});
