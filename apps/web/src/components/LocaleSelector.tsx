"use client"

import { MouseEventHandler } from "react"

import { sharedConfig } from "@airneis/config"
import type { Locale } from "@airneis/types"

import useTranslations from "@/utils/i18n/client"

const LocaleSelector = () => {
  const { changeLocale, locale } = useTranslations()
  const handleChange: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const language = event.currentTarget.getAttribute("data-locale") as Locale

    if (language === locale) {
      return
    }

    await changeLocale(language)
  }

  return (
    <div className="flex gap-1">
      {sharedConfig.languageKeys.map((language: string, index: number) => (
        <div key={language} className="flex gap-1">
          <button
            data-locale={language}
            onClick={handleChange}
            className={locale === language ? "underline" : ""}
          >
            {language.toUpperCase()}
          </button>
          <p>{index !== sharedConfig.languageKeys.length - 1 && "/"}</p>
        </div>
      ))}
    </div>
  )
}
export default LocaleSelector
