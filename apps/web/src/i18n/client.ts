"use client"

import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next"

import { sharedConfig } from "@airneis/config"
import { Locale } from "@airneis/types"

import config, { Namespace } from "@/utils/config"

import { getOptions } from "./settings"

const runsOnServerSide = typeof window === "undefined"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .use(ICU)
  .init({
    ...getOptions(),
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? sharedConfig.languageKeys : [],
  })

export const useTranslation = (...ns: Namespace[]) => {
  const { locale } = useParams<{ locale: Locale }>()
  const ret = useTranslationOrg(
    ns.length > 0 ? ns : config.locale.defaultNamespace,
  )
  const { i18n } = ret
  const [activeLang, setActiveLang] = useState(i18n.resolvedLanguage)

  useEffect(() => {
    if (activeLang === i18n.resolvedLanguage) {
      return
    }

    setActiveLang(i18n.resolvedLanguage)
  }, [activeLang, i18n.resolvedLanguage])
  useEffect(() => {
    void i18n.changeLanguage(locale)
  }, [locale, i18n])

  if (runsOnServerSide && i18n.resolvedLanguage !== locale) {
    void i18n.changeLanguage(locale)
  }

  return { ...ret, locale }
}
