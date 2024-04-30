import { z } from "zod"

import { localizedSchema } from "./locales"

export const createMaterialSchema = z.object({
  name: localizedSchema,
})

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>
