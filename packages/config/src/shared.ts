import { z } from "zod"

export const languages = ["en", "fr"] as const
export const apiSources = ["web-client", "web-server", "expo-react"] as const
const schema = z.object({
  languageKeys: z.array(z.enum(languages)),
  fallbackLng: z.enum(languages).default("en"),
  localeCookieKey: z.string(),
  api: z.object({
    path: z.string(),
    source: z.object({
      key: z.string(),
      webClient: z.literal(apiSources[0]),
      webServer: z.literal(apiSources[1]),
      mobile: z.literal(apiSources[2]),
    }),
  }),
})

export type Locale = z.infer<typeof schema>["fallbackLng"]

export const sharedConfig = schema.parse({
  languageKeys: languages,
  localeCookieKey: "lang",
  api: {
    path: "/api/trpc",
    source: {
      key: "x-trpc-source",
      webClient: apiSources[0],
      webServer: apiSources[1],
      mobile: apiSources[2],
    },
  },
})
