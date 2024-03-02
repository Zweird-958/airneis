import { create } from "zustand"

import config from "@airneis/config/shared"
import type { Locale } from "@airneis/types"

import common from "@/locales/en/common"
import forms from "@/locales/en/forms"

type LocaleStore = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translations: typeof defaultTranslation
  setTranslations: (translations: typeof defaultTranslation) => void
}

const defaultTranslation = {
  common,
  forms,
}
const useLocaleStore = create<LocaleStore>((set) => ({
  locale: config.fallbackLng,
  setLocale: (locale: Locale) => set({ locale }),
  translations: defaultTranslation,
  setTranslations: (translations: typeof defaultTranslation) =>
    set({ translations }),
}))

export default useLocaleStore
