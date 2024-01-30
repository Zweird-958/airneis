import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

import { Locale } from "@airneis/types/Locale"

import useLocaleStore from "@/stores/locale"
import getTranslations from "@/utils/locale/getTranslations"

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
      setTranslations(await getTranslations(newLocale))
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

  return { setLocale, changeLocale, locale, ...localeStore }
}
export default useLocale
