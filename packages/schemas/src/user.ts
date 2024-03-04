import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email({ message: "invalid" }),
  password: z.string().min(8, { message: "length" }),
})
