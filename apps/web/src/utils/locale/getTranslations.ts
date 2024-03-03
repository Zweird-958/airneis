import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import type common from "@/locales/en/common"
import type forms from "@/locales/en/forms"

type Key = "common" | "forms" | "zodErrors"

const getLocales = async <T>(key: Key, locale: Locale) => {
  const translations = await import(`@/locales/${locale}/${key}`)

  return translations.default as T
}
const getTranslations = async (locale: Locale) => ({
  common: await getLocales<typeof common>("common", locale),
  forms: await getLocales<typeof forms>("forms", locale),
  zodErrors: await getLocales<typeof forms>("zodErrors", locale),
  t: translationInterpolator,
})

export default getTranslations
