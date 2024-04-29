import { create } from "zustand"

import { sharedConfig } from "@airneis/config"
import type { Locale } from "@airneis/config"

import { translations as defaultTranslation } from "@/utils/locale/getTranslations"

type LocaleStore = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translations: typeof defaultTranslation.en
  setTranslations: (translations: typeof defaultTranslation.en) => void
}

const useLocaleStore = create<LocaleStore>((set) => ({
  locale: sharedConfig.fallbackLng,
  setLocale: (locale: Locale) => set({ locale }),
  translations: defaultTranslation.en,
  setTranslations: (translations: typeof defaultTranslation.en) =>
    set({ translations }),
}))

export default useLocaleStore
