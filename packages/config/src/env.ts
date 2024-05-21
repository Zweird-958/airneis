import { z } from "zod"

const schema = z.object({
  PORT: z.coerce.number().default(3000),

  // Vercel
  VERCEL_URL: z
    .string()
    .optional()
    .transform((v) => v && `https://${v}`),
})
const env = schema.parse({
  PORT: process.env.PORT,
  VERCEL_URL: process.env.VERCEL_URL,
})

export default env
