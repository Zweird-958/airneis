import { emailSchema } from "packages/schemas/src/users"
import { z } from "zod"

export const createContactSchema = z.object({
  email: emailSchema,
  subject: z.string().min(1),
  description: z.string().min(1),
})

export type CreateContactInput = z.infer<typeof createContactSchema>
