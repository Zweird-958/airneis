import { z } from "zod"

const schema = z.object({
  localeStoreKey: z.string(),
})
const config = schema.parse({
  localeStoreKey: "LANG",
})

export default config
