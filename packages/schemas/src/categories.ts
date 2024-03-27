import { z } from "zod"

import { imageSchema } from "./images"
import { localizedSchema } from "./locales"

export const createCategorySchema = z.object({
  name: localizedSchema,
  description: localizedSchema,
  image: imageSchema,
})
export const createCategorySchemaWithoutImage = createCategorySchema.omit({
  image: true,
})

export type CreateCategoryInput = z.infer<
  typeof createCategorySchemaWithoutImage
>
