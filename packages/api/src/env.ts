import { z } from "zod"

const schema = z.object({
  // Meilisearch
  NEXT_PUBLIC_MEILISEARCH_URL: z.string().url(),
  MEILISEARCH_ADMIN_KEY: z.string(),

  // Redis
  REDIS_URL: z.string().url(),

  // Security
  JWT_SECRET: z.string(),
  HASH_SALT_COUNT: z.coerce.number(),

  // Resend
  RESEND_EMAIL_FROM: z.string().email(),

  // Vercel
  VERCEL_URL: z.string().url(),
})
const env = schema.parse({
  NEXT_PUBLIC_MEILISEARCH_URL: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  MEILISEARCH_ADMIN_KEY: process.env.MEILISEARCH_ADMIN_KEY,
  REDIS_URL: process.env.REDIS_URL,
  HASH_SALT_COUNT: process.env.HASH_SALT_COUNT,
  JWT_SECRET: process.env.JWT_SECRET,
  RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM,
  VERCEL_URL: process.env.VERCEL_URL || "http://localhost:3000",
})

export default env
