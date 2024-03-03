import { localizedSchema } from "packages/schemas"
import { z } from "zod"

export const createCategorySchema = z.object({
  name: localizedSchema,
  description: localizedSchema,
  imageUrl: z.string().url(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
