import { z } from "zod"

import { pageSchema, slugSchema } from "./common"
import { localizedSchema } from "./locales"

export const createCategorySchema = z.object({
  name: localizedSchema,
  description: localizedSchema,
  imageUrl: z.string().url(),
})
export const getCategorySchema = z.object({
  slug: slugSchema,
  page: pageSchema,
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
