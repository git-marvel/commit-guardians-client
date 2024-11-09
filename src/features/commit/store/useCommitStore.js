import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  commitInfo: {
    commitList: [],
    commitNumber: null,
    totalCommitNumber: null,
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

      setCommitList: (newCommitList) =>
        set((state) => ({
          commitInfo: {
            ...state.commitInfo,
            commitList: newCommitList,
            commitNumber: newCommitList.length,
          },
        })),

      setTotalCommitNumber: (totalCommitNumber) =>
        set((state) => ({
          commitInfo: {
            ...state.commitInfo,
            totalCommitNumber: totalCommitNumber,
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
