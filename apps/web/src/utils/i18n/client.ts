"use client"

import { useParams, usePathname, useRouter } from "next/navigation"

import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import { translations } from "@/utils/i18n/settings"

const useTranslations = () => {
  const { locale } = useParams() as { locale: Locale }
  const pathname = usePathname()
  const router = useRouter()
  const changeLocale = (newLocale: Locale) => {
    const [path] = pathname.split("/")
    router.replace(`/${newLocale}${path ?? ""}`)
  }

  return {
    ...translations[locale],
    t: translationInterpolator,
    changeLocale,
    locale,
  }
}

export default useTranslations
