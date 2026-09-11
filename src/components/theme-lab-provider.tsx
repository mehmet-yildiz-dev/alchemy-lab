import {
  DEFAULT_TOKENS,
  type AlchemyColor,
  type FontSet,
  type MotionPreset,
  type RadiusPreset,
  type ThemeMode,
  type TokenKey,
} from "@/src/foundation/theme";
import * as React from "react";

type ThemeLabValue = {
  mode: ThemeMode;
  fontSet: FontSet;
  radius: RadiusPreset;
  motion: MotionPreset;
  tokens: Record<TokenKey, AlchemyColor>;
  setMode: (mode: ThemeMode) => void;
  setFontSet: (fontSet: FontSet) => void;
  setRadius: (radius: RadiusPreset) => void;
  setMotion: (motion: MotionPreset) => void;
  setToken: (key: TokenKey, color: AlchemyColor) => void;
  reset: () => void;
};

const ThemeLabContext = React.createContext<ThemeLabValue | null>(null);
// Bumped with the metal-name remap so old material choices do not override the new defaults.
const TOKEN_STORAGE_KEY = "alchemy-tokens-v2";

function readPreference<T extends string>(key: string, fallback: T): T {
  return (localStorage.getItem(key) as T | null) ?? fallback;
}

function readTokens(): Record<TokenKey, AlchemyColor> {
  const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!stored) return DEFAULT_TOKENS;

  try {
    return { ...DEFAULT_TOKENS, ...(JSON.parse(stored) as Record<TokenKey, AlchemyColor>) };
  } catch {
    return DEFAULT_TOKENS;
  }
}

function ThemeLabProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<ThemeMode>(() => readPreference("alchemy-mode", "dark"));
  const [fontSet, setFontSet] = React.useState<FontSet>(() =>
    readPreference("alchemy-font-set", "my-website"),
  );
  const [radius, setRadius] = React.useState<RadiusPreset>(() =>
    readPreference("alchemy-radius", "balanced"),
  );
  const [motion, setMotion] = React.useState<MotionPreset>(() =>
    readPreference("alchemy-motion", "restrained"),
  );
  const [tokens, setTokens] = React.useState<Record<TokenKey, AlchemyColor>>(readTokens);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(mode);
    root.dataset.fontSet = fontSet;
    root.dataset.radius = radius;
    root.dataset.motion = motion;

    const themeColor = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = mode === "dark" ? "#17151c" : "#f4f6f6";

    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty(`--app-${key}`, `var(--${value})`);
    }

    localStorage.setItem("alchemy-mode", mode);
    localStorage.setItem("alchemy-font-set", fontSet);
    localStorage.setItem("alchemy-radius", radius);
    localStorage.setItem("alchemy-motion", motion);
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  }, [fontSet, mode, motion, radius, tokens]);

  const value = React.useMemo<ThemeLabValue>(
    () => ({
      mode,
      fontSet,
      radius,
      motion,
      tokens,
      setMode,
      setFontSet,
      setRadius,
      setMotion,
      setToken: (key, color) => setTokens((current) => ({ ...current, [key]: color })),
      reset: () => {
        setFontSet("my-website");
        setRadius("balanced");
        setMotion("restrained");
        setTokens(DEFAULT_TOKENS);
      },
    }),
    [fontSet, mode, motion, radius, tokens],
  );

  return <ThemeLabContext.Provider value={value}>{children}</ThemeLabContext.Provider>;
}

function useThemeLab() {
  const context = React.useContext(ThemeLabContext);
  if (!context) throw new Error("useThemeLab must be used inside ThemeLabProvider");
  return context;
}

export { ThemeLabProvider, useThemeLab };
