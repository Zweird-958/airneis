import type { Locale } from "@airneis/types/Locale"

import type common from "@/locales/en/common.json"

type Key = "common"

const getLocales = async <T>(key: Key, locale: Locale) =>
  (await import(`@/locales/${locale}/${key}`)) as Promise<T>
const getTranslations = async (locale: Locale) => ({
  common: await getLocales<typeof common>("common", locale),
})

export default getTranslations
