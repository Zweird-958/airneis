import { z } from "zod"

const schema = z.object({
  // Meilisearch
  NEXT_PUBLIC_MEILISEARCH_URL: z.string().url(),
  MEILISEARCH_ADMIN_KEY: z.string(),

  // Redis
  REDIS_URL: z.string().url(),

  //Hash
  HASH_SALT_COUNT: z.number(),
})
const env = schema.parse({
  NEXT_PUBLIC_MEILISEARCH_URL: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  MEILISEARCH_ADMIN_KEY: process.env.MEILISEARCH_ADMIN_KEY,
  REDIS_URL: process.env.REDIS_URL,
  HASH_SALTE_COUNT: process.env.HASH_SALT_COUNT,
})

export default env
