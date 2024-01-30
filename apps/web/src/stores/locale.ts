import { create } from "zustand"

import config from "@airneis/config/shared"
import { Locale } from "@airneis/types/Locale"

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
