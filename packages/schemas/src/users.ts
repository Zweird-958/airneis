import { z } from "zod"

export const emailSchema = z.string().email()

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
})
export const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: emailSchema,
  password: z
    .string()
    .min(8)
    .regex(/(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u, {
      message: "regex",
    }),
})
export const validationAccountSchema = z.object({
  jwt: z.string(),
})

export type SignUpInput = z.infer<typeof signUpSchema>
