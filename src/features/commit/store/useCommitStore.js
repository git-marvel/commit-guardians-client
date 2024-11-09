import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  commitList: [],
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
        set(() => ({
          commitList: newCommitList,
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
