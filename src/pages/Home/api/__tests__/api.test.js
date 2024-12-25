import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { getCommitDiffList, getCommitList } from "../index";
import diffPerCommit from "./diffPerCommit.mock";
import mockCommits from "./mockCommits.mock";
import mockCommitsToCheck from "./mockCommitsToCheck.mock";

vi.mock("axios");

describe("Home API", () => {
  const mockOwner = "owner";
  const mockRepo = "repo";

  describe("getCommitList 테스트", () => {
    it("하나의 레포지토리의 모든 커밋들을 가져올 수 있습니다", async () => {
      axios.get.mockResolvedValueOnce({
        data: mockCommits,
        headers: {
          "x-ratelimit-remaining": 5000,
          get(key) {
            return this[key];
          },
        },
      });

      const result = await getCommitList({ owner: mockOwner, repo: mockRepo });
      expect(result).toEqual(mockCommits);
    });
  });

  describe("getCommitDiffList 테스트", () => {
    it("각 커밋에 따른 diff 를 받을 수 있습니다", async () => {
      mockCommitsToCheck.forEach(() => {
        axios.get.mockResolvedValueOnce({
          data: diffPerCommit,
          headers: {
            "x-ratelimit-remaining": 5000,
            get(key) {
              return this[key];
            },
          },
        });
      });

      const diffs = await getCommitDiffList({
        owner: mockOwner,
        repo: mockRepo,
        commitsToCheck: mockCommitsToCheck,
      });

      expect(diffs).toHaveLength(mockCommitsToCheck.length);
    });
  });
});
