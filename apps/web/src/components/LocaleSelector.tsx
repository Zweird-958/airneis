"use client"

import { MouseEventHandler } from "react"

import config from "@airneis/config/shared"
import { Locale } from "@airneis/types/Locale"

import useLocale from "@/hooks/useLocale"

const ChangeLocale = () => {
  const { changeLocale, locale } = useLocale()
  const handleChangeLanguage: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    const language = event.currentTarget.getAttribute("data-locale") as Locale

    await changeLocale(language)
  }

  return (
    <div className="flex gap-1">
      {config.languageKeys.map((language: string, index: number) => (
        <div key={language} className="flex gap-1">
          <button
            data-locale={language}
            onClick={handleChangeLanguage}
            className={locale === language ? "underline" : ""}
          >
            {language.toUpperCase()}
          </button>
          <p>{index !== config.languageKeys.length - 1 && "/"}</p>
        </div>
      ))}
    </div>
  )
}
export default ChangeLocale
