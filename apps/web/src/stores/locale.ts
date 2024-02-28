import { create } from "zustand"

import type { Locale } from "@airneis/types"
import config from "@airneis/config"

import common from "@/locales/en/common"

type LocaleStore = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translations: typeof defaultTranslation
  setTranslations: (translations: typeof defaultTranslation) => void
}

const defaultTranslation = {
  common,
}
const useLocaleStore = create<LocaleStore>((set) => ({
  locale: config.fallbackLng,
  setLocale: (locale: Locale) => set({ locale }),
  translations: defaultTranslation,
  setTranslations: (translations: typeof defaultTranslation) =>
    set({ translations }),
}))

export default useLocaleStore
