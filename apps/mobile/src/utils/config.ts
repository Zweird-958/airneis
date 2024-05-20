import { z } from "zod"

import { sharedConfig } from "@airneis/config"

import env from "@/env"

const schema = z.object({
  localeStoreKey: z.string(),
  pagination: z.object({
    step: z.number().min(1).default(1),
  }),
  apiUrl: z.string(),
})
const config = schema.parse({
  localeStoreKey: "LANG",
  pagination: {
    step: 2,
  },
  apiUrl: `${env.EXPO_PUBLIC_HOST_SERVER_URL}${sharedConfig.apiPath}`,
})

export default config
