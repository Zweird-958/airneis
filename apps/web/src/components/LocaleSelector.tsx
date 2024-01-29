"use client"

import config from "@airneis/config/shared"

import useLocale from "@/hooks/useLocale"

const ChangeLocale = () => {
  const { handleChangeLanguage, locale } = useLocale()

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
