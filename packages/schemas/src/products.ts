import { z } from "zod"

import { slugSchema } from "./common"

export const getSingleProductSchema = z.object({
  slug: slugSchema,
})

export const searchProductsSchema = z.object({
  query: z.string().min(1),
})

export type SearchProductsInput = z.infer<typeof searchProductsSchema>
