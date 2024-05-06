import { z } from "zod"

import { pageSchema, slugSchema } from "./common"
import { imageUrlSchema } from "./images"
import { localizedSchema } from "./locales"

export const createCategorySchema = z.object({
  name: localizedSchema,
  description: localizedSchema,
  imageUrl: imageUrlSchema,
})
export const getCategorySchema = z.object({
  slug: slugSchema,
  page: pageSchema,
})

export const createCategorySchemaWithoutImage = createCategorySchema.omit({
  imageUrl: true,
})

export type CreateCategoryInput = z.infer<
  typeof createCategorySchemaWithoutImage
>
