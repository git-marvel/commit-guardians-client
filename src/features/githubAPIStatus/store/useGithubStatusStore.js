import { create } from "zustand";

const initialState = {
  githubStatus: "not yet",
};

const useGithubStatusStore = create((set) => ({
  ...initialState,

  setGithubStatus: (githubStatus) =>
    set(() => ({
      githubStatus: githubStatus,
    })),

  clearAll: () =>
    set(() => ({
      ...initialState,
    })),
}));

export default useGithubStatusStore;
