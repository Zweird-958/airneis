import { z } from "zod"

const schema = z.object({
  session: z.object({
    localStorageKey: z.string(),
  }),
  pagination: z.object({
    step: z.number().min(1).default(1),
  }),
})
const config = schema.parse({
  session: {
    localStorageKey: "session",
  },
  pagination: {
    step: 2,
  },
})

export default config
