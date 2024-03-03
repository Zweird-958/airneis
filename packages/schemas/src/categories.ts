import { z } from "zod"

import { localizedSchema } from "./locales"

export const createCategorySchema = z.object({
  name: localizedSchema,
  description: localizedSchema,
  imageUrl: z.string().url(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
