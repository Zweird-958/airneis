import { z } from "zod"

import config from "@airneis/config"

export const localeSchema = z
  .enum(config.languageKeys)
  .catch(config.fallbackLng)

export const localizedSchema = z.record(
  z.enum(config.languageKeys),
  z.string().min(1),
)
