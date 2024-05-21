import { z } from "zod"

export const productIdSchema = z.string().uuid()
export const quantitySchema = z.number()

export const cartSchema = z.array(
  z.object({
    id: productIdSchema,
    quantity: quantitySchema,
  }),
)

export const addToCartSchema = z.object({
  productId: productIdSchema,
  quantity: quantitySchema,
})
