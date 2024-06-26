import { MeiliSearch } from "meilisearch"

import env from "./env"

export const meilisearch = new MeiliSearch({
  host: env.NEXT_PUBLIC_MEILISEARCH_URL,
  apiKey: env.MEILISEARCH_MASTER_KEY,
})
