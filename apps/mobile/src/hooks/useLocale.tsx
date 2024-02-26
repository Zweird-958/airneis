import { getItemAsync, setItemAsync } from "expo-secure-store"
import { useCallback, useEffect } from "react"

import { localeSchema } from "@airneis/schemas"
import type { Locale } from "@airneis/types/Locale"
import { translationInterpolator } from "@airneis/utils"

import useLocaleStore from "@/stores/locale"
import config from "@/utils/config"
import getTranslations from "@/utils/locale/getTranslations"

const useLocale = () => {
  const { setLocale, setTranslations, locale, ...localeStore } =
    useLocaleStore()
  const changeLocale = useCallback(
    async (newLocale: Locale) => {
      if (locale === newLocale) {
        return
      }

      await setItemAsync(config.localeStoreKey, newLocale)
      setLocale(newLocale)
      const { t: _, ...translations } = getTranslations(newLocale)
      setTranslations(translations)
    },
    [locale, setLocale, setTranslations],
  )

  useEffect(() => {
    void (async () => {
      const localeStored = await getItemAsync(config.localeStoreKey)
      const currentLocale = localeSchema.parse(localeStored)
      setLocale(currentLocale)
      setTranslations(getTranslations(currentLocale))
    })()
  }, [changeLocale, setLocale, setTranslations])

  return {
    setLocale,
    changeLocale,
    t: translationInterpolator,
    locale,
    ...localeStore,
  }
}
export default useLocale
