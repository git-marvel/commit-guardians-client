import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { throwIndexedDBErrorMessage } from "../../../shared/error/throwCustomErrorMessage";

const indexedDB = {
  getItem: async (name) => {
    try {
      const value = await get(name);
      return value || null;
    } catch (error) {
      throwIndexedDBErrorMessage(error);
    }
  },
  setItem: async (name, value) => {
    try {
      await set(name, value);
    } catch (error) {
      throwIndexedDBErrorMessage(error);
    }
  },
  removeItem: async (name) => {
    try {
      await del(name);
    } catch (error) {
      throwIndexedDBErrorMessage(error);
    }
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
      storage: createJSONStorage(() => indexedDB),
    }
  )
);

export default useCommitStore;
