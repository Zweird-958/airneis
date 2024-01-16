import { z } from "zod"

const schema = z.object({
  VERCEL_URL: z
    .string()
    .optional()
    .transform((v) => v && `https://${v}`),
  PORT: z.coerce.number().default(3000),
})
const env = schema.parse(process.env)

export default env
