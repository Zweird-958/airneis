import { z } from "zod"

const schema = z.object({
  security: z.object({
    jwt: z.object({
      expiresIn: z.string(),
    }),
  }),
})
const config = schema.parse({
  security: {
    jwt: {
      expiresIn: "2d",
    },
  },
})

export default config
