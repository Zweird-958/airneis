import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import type common from "@/locales/en/common"

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
