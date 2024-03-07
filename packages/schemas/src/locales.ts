import { z } from "zod"

import { sharedConfig } from "@airneis/config"

export const localeSchema = z
  .enum(sharedConfig.languageKeys)
  .catch(sharedConfig.fallbackLng)

export const localizedSchema = z.record(
  z.enum(sharedConfig.languageKeys),
  z.string().min(1),
)
