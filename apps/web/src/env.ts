import { z } from "zod"

const schema = z.object({
  PORT: z.coerce.number().default(3000),

  // Meilisearch
  NEXT_PUBLIC_MEILISEARCH_URL: z.string().url(),
  NEXT_PUBLIC_MEILISEARCH_PUBLIC_KEY: z.string(),
})
const env = schema.parse({
  PORT: process.env.PORT,
  NEXT_PUBLIC_MEILISEARCH_URL: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  NEXT_PUBLIC_MEILISEARCH_PUBLIC_KEY: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
})

export default env
