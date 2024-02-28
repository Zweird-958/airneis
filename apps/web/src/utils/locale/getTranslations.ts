import type { Locale } from "@airneis/types"

import type common from "@/locales/en/common"
import translationInterpolator from "@/utils/locale/translationInterpolator"

type Key = "common"

const getLocales = async <T>(key: Key, locale: Locale) => {
  const translations = await import(`@/locales/${locale}/${key}`)

  return translations.default as T
}
const getTranslations = async (locale: Locale) => ({
  common: await getLocales<typeof common>("common", locale),
  t: translationInterpolator,
})

export default getTranslations
