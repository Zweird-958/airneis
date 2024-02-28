import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import common from "@/locales/en/common"
import commonFr from "@/locales/fr/common"

const translations = {
  en: {
    common,
  },
  fr: {
    common: commonFr,
  },
}
const getTranslations = (locale: Locale) => ({
  ...(translations[locale] as typeof translations.en),
  t: translationInterpolator,
})

export default getTranslations
