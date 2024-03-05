import { create } from "zustand"

import config from "@airneis/config"
import type { Locale } from "@airneis/types"

import categories from "@/locales/en/categories"
import common from "@/locales/en/common"
import forms from "@/locales/en/forms"
import zodErrors from "@/locales/en/zodErrors"

type LocaleStore = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translations: typeof defaultTranslation
  setTranslations: (translations: typeof defaultTranslation) => void
}

const defaultTranslation = {
  categories,
  common,
  forms,
  zodErrors: zodErrors as Record<string, Record<string, string>>,
}
const useLocaleStore = create<LocaleStore>((set) => ({
  locale: config.fallbackLng,
  setLocale: (locale: Locale) => set({ locale }),
  translations: defaultTranslation,
  setTranslations: (translations: typeof defaultTranslation) =>
    set({ translations }),
}))

export default useLocaleStore
