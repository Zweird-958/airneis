import { z } from "zod"

import config from "@airneis/config"
import { Locale } from "@airneis/types"

export const localeSchema = z
  .enum(config.languageKeys)
  .catch(config.fallbackLng)

export const localizedSchema = z.record(
  z.enum(config.languageKeys),
  z.string().min(1),
)

export const localizedFieldDefaultValues: Record<Locale, ""> = {
  en: "",
  fr: "",
}
