import { z } from "zod"

export const languages = ["en", "fr"] as const
const schema = z.object({
  languageKeys: z.array(z.enum(languages)),
  fallbackLng: z.enum(languages).default("en"),
  localeCookieKey: z.string(),
  apiPath: z.string(),
})

export type Locale = z.infer<typeof schema>["fallbackLng"]

export const sharedConfig = schema.parse({
  languageKeys: languages,
  localeCookieKey: "lang",
  apiPath: "/api/trpc",
})
