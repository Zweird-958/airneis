import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import categories from "@/locales/en/categories"
import common from "@/locales/en/common"
import categoriesFr from "@/locales/fr/categories"
import commonFr from "@/locales/fr/common"

export const translations = {
  en: {
    common,
    categories,
  },
  fr: {
    common: commonFr,
    categories: categoriesFr,
  },
}
const getTranslations = (locale: Locale) => ({
  ...(translations[locale] as typeof translations.en),
  t: translationInterpolator,
})

export default getTranslations
