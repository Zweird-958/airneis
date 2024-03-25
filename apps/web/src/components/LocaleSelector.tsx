"use client"

import Link from "next/link"

import { sharedConfig } from "@airneis/config"

import { useTranslation } from "@/i18n/client"

const LocaleSelector = () => {
  const { locale } = useTranslation()

  return (
    <div className="flex gap-1">
      {sharedConfig.languageKeys.map((language: string, index: number) => (
        <div key={language} className="flex gap-1">
          <Link
            data-locale={language}
            href={`/${language}`}
            className={locale === language ? "underline" : ""}
          >
            {language.toUpperCase()}
          </Link>
          <p>{index !== sharedConfig.languageKeys.length - 1 && "/"}</p>
        </div>
      ))}
    </div>
  )
}
export default LocaleSelector
