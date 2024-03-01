import { z } from "zod"

const schema = z.object({
  security: z.object({
    jwt: z.object({
      secret: z.string(),
      expiresIn: z.string(),
    }),
  }),
})
const config = schema.parse({
  security: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: "2d",
    },
  },
})

export default config
