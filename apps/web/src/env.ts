import { z } from "zod"

const schema = z.object({
  PORT: z.coerce.number().default(3000),

  // Vercel
  VERCEL_URL: z
    .string()
    .optional()
    .transform((v) => v && `https://${v}`),

  // Meilisearch
  NEXT_PUBLIC_MEILISEARCH_URL: z.string().url(),
  NEXT_PUBLIC_MEILISEARCH_PUBLIC_KEY: z.string(),
})
const env = schema.parse(process.env)

export default env
