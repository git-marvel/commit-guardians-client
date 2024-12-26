import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  isAbleToRoute: false,
  githubToken: null,
};

const usePersistentStore = create(
  persist(
    (set) => ({
      ...initialState,

      setIsAbleToRoute: (isStored) =>
        set(() => ({
          isAbleToRoute: isStored,
        })),

      setGithubToken: (githubToken) =>
        set(() => ({
          githubToken: githubToken,
        })),

      clearAll: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default usePersistentStore;
