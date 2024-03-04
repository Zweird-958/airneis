import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import type categories from "@/locales/en/categories"
import type common from "@/locales/en/common"
import type forms from "@/locales/en/forms"
import type zodErrors from "@/locales/en/zodErrors"

type Key = "categories" | "common" | "forms" | "zodErrors"

const getLocales = async <T>(key: Key, locale: Locale) => {
  const translations = await import(`@/locales/${locale}/${key}`)

  return translations.default as T
}
const getTranslations = async (locale: Locale) => ({
  categories: await getLocales<typeof categories>("categories", locale),
  common: await getLocales<typeof common>("common", locale),
  forms: await getLocales<typeof forms>("forms", locale),
  zodErrors: await getLocales<typeof zodErrors>("zodErrors", locale),
  t: translationInterpolator,
})

export default getTranslations
