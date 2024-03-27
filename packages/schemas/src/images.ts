import { z } from "zod"

export const imageSchema = z.object({
  buffer: z.string(),
  type: z.string(),
})
