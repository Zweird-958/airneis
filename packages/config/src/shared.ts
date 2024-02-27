import type { Locale } from "@airneis/types"

type Config = {
  languageKeys: [Locale, ...Locale[]]
  fallbackLng: Locale
}

const config: Config = {
  languageKeys: ["en", "fr"],
  fallbackLng: "en",
}

export default config
