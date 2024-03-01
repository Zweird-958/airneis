import type { Locale } from "@airneis/types"

type Config = {
  languageKeys: [Locale, ...Locale[]]
  fallbackLng: Locale
}

export const sharedConfig: Config = {
  languageKeys: ["en", "fr"],
  fallbackLng: "en",
}
