import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  repository: {
    owner: null,
    repo: null,
  },
  commitInfo: {
    commitList: [],
    numOfCommit: null,
    totalNumOfCommit: null,
  },
  scoredCommitInfo: {
    perfectCommitNumber: null,
    finalQualityPercent: null,
  },
};

const useCommitStore = create(
  persist(
    (set) => ({
      ...initialState,

      setRepository: ({ owner, repo }) =>
        set((state) => ({
          repository: {
            ...state.repository,
            owner: owner,
            repo: repo,
          },
        })),

      setCommitList: (newCommitList) =>
        set((state) => ({
          commitInfo: {
            ...state.commitInfo,
            commitList: newCommitList,
            numOfCommit: newCommitList.length,
          },
        })),

      setTotalNumOfCommit: (totalNumOfCommit) =>
        set((state) => ({
          commitInfo: {
            ...state.commitInfo,
            totalNumOfCommit: totalNumOfCommit,
          },
        })),

      setScoredCommitInfo: (newScoredCommitInfo) =>
        set(() => ({
          scoredCommitInfo: newScoredCommitInfo,
        })),

      clearAll: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: "commit-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCommitStore;
