import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

type StoreData = {
  language: string;
};

type StoreActions = {
  setLanguage: (language: string) => void;
};

type StoreState = StoreData & StoreActions;

const PERSISTED_KEYS = ["language"];
const DEFAULT_STORE_DATA: StoreData = {
  language: Localization.getLocales()[0].languageTag,
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      ...DEFAULT_STORE_DATA,

      // Actions
      setLanguage(language) {
        set({ language });
      },
    }),

    // Persist config
    {
      name: "general-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => PERSISTED_KEYS.includes(key))
        ),
    }
  )
);

export const useIsStoreHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(useStore.persist.hasHydrated());

  useEffect(() => {
    const handleStoreHydration = () => setIsHydrated(true);

    const unsubscribe =
      useStore.persist.onFinishHydration(handleStoreHydration);

    return () => unsubscribe();
  }, []);

  return isHydrated;
};
