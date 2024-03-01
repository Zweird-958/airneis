import { z } from "zod"

const schema = z.object({
  security: z.object({
    session: z.object({
      cookie: z.object({
        key: z.string(),
        secure: z.boolean(),
      }),
    }),
  }),
})
export const webConfig = schema.parse({
  security: {
    session: {
      cookie: {
        key: "sessionJsonWebToken",
        secure: process.env.NODE_ENV !== "development",
      },
    },
  },
})
