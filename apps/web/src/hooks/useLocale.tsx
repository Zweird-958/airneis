import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

import type { Locale } from "@airneis/types"

import useLocaleStore from "@/stores/locale"
import getTranslations from "@/utils/locale/getTranslations"
import translationInterpolator from "@/utils/locale/translationInterpolator"

const useLocale = () => {
  const { setLocale, setTranslations, locale, ...localeStore } =
    useLocaleStore()
  const router = useRouter()
  const pathname = usePathname()
  const changeLocale = useCallback(
    async (newLocale: Locale) => {
      if (locale === newLocale) {
        return
      }

      setLocale(newLocale)
      const { t: _, ...translations } = await getTranslations(newLocale)
      setTranslations(translations)
      const [path] = pathname.split("/")
      router.replace(`/${newLocale}${path ?? ""}`)
    },
    [locale, pathname, router, setLocale, setTranslations],
  )

  useEffect(() => {
    void (async () => {
      const currentLocale = pathname.split("/")[1] as Locale
      setLocale(currentLocale)
      setTranslations(await getTranslations(currentLocale))
    })()
  }, [changeLocale, pathname, setLocale, setTranslations])

  return {
    setLocale,
    changeLocale,
    t: translationInterpolator,
    locale,
    ...localeStore,
  }
}
export default useLocale
