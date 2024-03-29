import { z } from "zod"

const schema = z.object({
  pagination: z.object({
    itemsPerPage: z.number().min(1).max(50),
  }),
  currency: z.enum(["EUR", "USD"]),
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
  pagination: {
    itemsPerPage: 12,
  },
  currency: "EUR",
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
