import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TokenResponseConfig } from "expo-auth-session";

import {
  tokensToConfig,
  revokeTokens,
  refreshTokens as _refreshTokens,
} from "@/services/auth";

type StoreData = {
  tokens: TokenResponseConfig | null;
};

type StoreActions = {
  login: (tokens: TokenResponseConfig) => void;
  logout: () => void;
  refreshTokens: () => Promise<void>;
};

type StoreState = StoreData & StoreActions;

const PERSISTED_KEYS = ["tokens"];
const DEFAULT_STORE_DATA: StoreData = {
  tokens: null,
};

export const COMPUTED_IS_SIGNED_IN = (state: StoreState) => !!state.tokens;

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STORE_DATA,

      // Actions
      login(tokens) {
        const tokenConfig = tokensToConfig(tokens);

        set({ tokens: tokenConfig });
      },

      async logout() {
        const { tokens } = get();

        if (!tokens) return;

        await revokeTokens(tokens);
        set({ tokens: null });
      },

      async refreshTokens() {
        const { tokens } = get();

        if (!tokens) return;

        await _refreshTokens(tokens);
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
