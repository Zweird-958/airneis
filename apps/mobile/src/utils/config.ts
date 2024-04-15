import { z } from "zod"

const schema = z.object({
  localeStoreKey: z.string(),
  pagination: z.object({
    step: z.number().min(1).default(1),
  }),
})
const config = schema.parse({
  localeStoreKey: "LANG",
  pagination: {
    step: 2,
  },
})

export default config
