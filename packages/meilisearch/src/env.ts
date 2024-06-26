import { config as dotenv } from "dotenv"
import { z } from "zod"

dotenv({ path: "../../.env" })

const schema = z.object({
  NEXT_PUBLIC_MEILISEARCH_URL: z.string(),
  MEILISEARCH_MASTER_KEY: z.string(),
})
const env = schema.parse({
  NEXT_PUBLIC_MEILISEARCH_URL: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  MEILISEARCH_MASTER_KEY: process.env.MEILISEARCH_MASTER_KEY,
})

export default env
