import { z } from "zod"

const schema = z.object({
  // Meilisearch
  NEXT_PUBLIC_MEILISEARCH_URL: z.string().url(),
  MEILISEARCH_ADMIN_KEY: z.string(),

  // Redis
  REDIS_URL: z.string().url(),

  // Security
  JWT_SECRET: z.string(),
})
const env = schema.parse({
  NEXT_PUBLIC_MEILISEARCH_URL: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  MEILISEARCH_ADMIN_KEY: process.env.MEILISEARCH_ADMIN_KEY,
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
})

export default env
