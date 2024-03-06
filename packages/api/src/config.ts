import { z } from "zod"

const schema = z.object({
  security: z.object({
    jwt: z.object({
      expiresIn: z.string(),
      cookie: z.object({
        key: z.string(),
        secure: z.boolean(),
      }),
      hashingDuration: z.number(),
    }),
  }),
})
const config = schema.parse({
  security: {
    jwt: {
      expiresIn: "2d",
      cookie: {
        key: "sessionJsonWebToken",
        secure: process.env.NODE_ENV !== "development",
      },
      hashingDuration: 1000,
    },
  },
})

export default config
