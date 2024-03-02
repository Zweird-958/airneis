import type { Locale } from "@airneis/types"

import type common from "@/locales/en/common"
import type forms from "@/locales/en/forms"
import translationInterpolator from "@/utils/locale/translationInterpolator"

type Key = "common" | "forms"

const getLocales = async <T>(key: Key, locale: Locale) => {
  const translations = await import(`@/locales/${locale}/${key}`)

  return translations.default as T
}
const getTranslations = async (locale: Locale) => ({
  common: await getLocales<typeof common>("common", locale),
  forms: await getLocales<typeof forms>("forms", locale),
  t: translationInterpolator,
})

export default getTranslations
