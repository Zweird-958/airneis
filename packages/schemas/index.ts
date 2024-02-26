import { z } from "zod"

import config from "@airneis/config"

export const localeSchema = z
  .enum(config.languageKeys)
  .catch(config.fallbackLng)
