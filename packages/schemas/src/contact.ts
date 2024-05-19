import { emailSchema } from "packages/schemas/src/users"
import { z } from "zod"

export const createContactSchema = z.object({
  email: emailSchema,
  subject: z.string(),
  description: z.string(),
})

export type CreateContactInput = z.infer<typeof createContactSchema>
