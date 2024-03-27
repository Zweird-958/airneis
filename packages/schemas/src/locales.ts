import { z } from "zod"

import { languages, sharedConfig } from "@airneis/config"

export const localeSchema = z.enum(languages)

export const localeFallbackSchema = localeSchema.catch(sharedConfig.fallbackLng)

export const localizedSchema = z.record(localeSchema, z.string().min(1))
