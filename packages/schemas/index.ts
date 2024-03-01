import { z } from "zod"

import { sharedConfig } from "@airneis/config"

export const localeSchema = z
  .enum(sharedConfig.languageKeys)
  .catch(sharedConfig.fallbackLng)

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
