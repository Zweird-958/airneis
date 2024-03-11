import { z } from "zod"

const schema = z.object({
  localeStoreKey: z.string(),
  session: z.object({
    localStorageKey: z.string(),
  }),
})
const config = schema.parse({
  localeStoreKey: "LANG",
  session: {
    localStorageKey: "session",
  },
})

export default config
