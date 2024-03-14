import { z } from "zod"

export const emailSchema = z.string().email()

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
})
export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: emailSchema,
  password: z
    .string()
    .min(8)
    .regex(/(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u),
})

export type SignUpInput = z.infer<typeof signUpSchema>
