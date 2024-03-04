import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import { translations } from "@/utils/i18n/settings"

const useTranslations = (locale: Locale) => ({
  ...translations[locale],
  t: translationInterpolator,
})
export default useTranslations
