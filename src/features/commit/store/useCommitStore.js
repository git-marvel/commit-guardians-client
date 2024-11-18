import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

const storage = {
  getItem: async (name) => {
    return (await get(name)) || null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  },
};

const initialState = {
  repository: {
    owner: null,
    repo: null,
  },
  commitInfo: {
    commitList: [],
    commitFormatStyle: {},
    numOfCommit: null,
    totalNumOfCommit: null,
  },
  commitSummary: {
    numOfPerfectCommits: null,
    totalScore: null,
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

      setCommitFormatStyle: (commitFormatStyleObj) =>
        set((state) => ({
          commitInfo: {
            ...state.commitInfo,
            commitFormatStyle: commitFormatStyleObj,
          },
        })),

      setTotalNumOfCommit: (totalNumOfCommit) =>
        set((state) => ({
          commitInfo: {
            ...state.commitInfo,
            totalNumOfCommit: totalNumOfCommit,
          },
        })),

      setCommitSummary: (summaryObj) =>
        set(() => ({
          commitSummary: summaryObj,
        })),

      clearAll: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: "commit-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useCommitStore;
