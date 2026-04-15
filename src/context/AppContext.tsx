import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "foodie.hasCompletedOnboarding";

type AppContextValue = {
  ready: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(KEY);
        setHasCompletedOnboarding(v === "1");
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(KEY, "1");
    setHasCompletedOnboarding(true);
  }, []);

  const resetOnboarding = useCallback(async () => {
    await AsyncStorage.removeItem(KEY);
    setHasCompletedOnboarding(false);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      hasCompletedOnboarding,
      completeOnboarding,
      resetOnboarding,
    }),
    [ready, hasCompletedOnboarding, completeOnboarding, resetOnboarding]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
