import { z } from "zod"

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
