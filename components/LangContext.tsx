"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG, ui, type Lang, type UiKey } from "@/lib/i18n";

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/**
 * `t` reads a chrome string, `x` picks the right side of any bilingual value
 * coming out of content/property.ts.
 */
export function useLang() {
  const lang = useContext(LangContext);
  return {
    lang,
    t: (key: UiKey) => ui[lang][key],
    x: <T,>(value: Record<Lang, T>) => value[lang],
  };
}
