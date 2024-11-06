import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  commitList: [],
};

const useCommitStore = create(
  persist(
    (set) => ({
      ...initialState,

      setCommitList: (newCommitList) =>
        set(() => ({
          commitList: newCommitList,
        })),

      clearCommitList: () =>
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
