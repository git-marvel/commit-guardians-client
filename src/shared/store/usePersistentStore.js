import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  isAbleToRoute: false,
};

const usePersistentStore = create(
  persist(
    (set) => ({
      ...initialState,

      setIsAbleToRoute: (isStored) =>
        set(() => ({
          isAbleToRoute: isStored,
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
