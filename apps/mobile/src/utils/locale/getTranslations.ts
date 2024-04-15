import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import common from "@/locales/en/common"
import forms from "@/locales/en/forms"
import commonFr from "@/locales/fr/common"
import formsFr from "@/locales/fr/forms"

const translations = {
  en: {
    common,
    forms,
  },
  fr: {
    common: commonFr,
    forms: formsFr,
  },
}
const getTranslations = (locale: Locale) => ({
  ...(translations[locale] as typeof translations.en),
  t: translationInterpolator,
})

export default getTranslations
