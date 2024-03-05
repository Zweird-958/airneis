import { z } from "zod"

const schema = z.object({
  session: z.object({
    localStorageKey: z.string(),
  }),
})
const config = schema.parse({
  session: {
    localStorageKey: "session",
  },
})

export default config
