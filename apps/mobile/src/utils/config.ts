import { sharedConfig } from "packages/config"
import { z } from "zod"

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
  apiUrl: `${env.EXPO_PUBLIC_HOST_SERVER_URL}${sharedConfig.apiEndpoint}`,
})

export default config
