import { z } from "zod"

export const imageSchema = z.object({
  buffer: z.instanceof(Buffer),
  type: z.string(),
})

export const imageUrlSchema = z.string()