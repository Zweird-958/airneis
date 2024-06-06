import { TRPCError } from "@trpc/server"

import { addToCartSchema } from "@airneis/schemas"
import { Product } from "@airneis/types"

import withAuth from "./withAuth"

const getProductInCart = withAuth("USER").unstable_pipe(
  async ({ ctx: { entities, user, ...ctx }, rawInput, next }) => {
    const input = addToCartSchema.safeParse(rawInput)

    if (!input.success) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: input.error.message,
      })
    }

    const product = await entities.product.findOne({
      id: input.data.productId as Product["id"],
    })

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
      })
    }

    const productInCart = await entities.cart.findOne({
      user,
      product,
    })

    return next({ ctx: { ...ctx, entities, user, product, productInCart } })
  },
)

export default getProductInCart
