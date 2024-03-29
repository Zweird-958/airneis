import { z } from "zod"

import { localizedSchema } from "./locales"

export const createCategorySchema = z.object({
  name: localizedSchema,
  description: localizedSchema,
  imageUrl: z.string(),
})

export const createCategorySchemaWithoutImage = createCategorySchema.omit({
  imageUrl: true,
})

export type CreateCategoryInput = z.infer<
  typeof createCategorySchemaWithoutImage
>
