import { emailSchema } from "packages/schemas/src/users"
import { z } from "zod"

export const createMessageSchema = z.object({
  email: emailSchema,
  subject: z.string(),
  description: z.string(),
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>
