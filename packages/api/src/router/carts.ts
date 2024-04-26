import { addToCartSchema } from "@airneis/schemas"
import { Product } from "@airneis/types"

import { authedProcedure, createTRPCRouter } from "../trpc"

const cartsRouter = createTRPCRouter({
  addToCart: authedProcedure
    .input(addToCartSchema)
    .mutation(
      async ({
        ctx: { entities, em, session },
        input: { productId, quantity },
      }) => {
        const user = await entities.user.findOneOrFail({ id: session.user.id })
        const product = await entities.product.findOneOrFail({
          id: productId as Product["id"],
        })
        const cartExists = await entities.cart.findOne({
          user,
          product,
        })

        if (cartExists) {
          cartExists.quantity += quantity
          await em.flush()

          return
        }

        entities.cart.create({
          product,
          quantity,
          user,
        })

        await em.flush()
      },
    ),
  get: authedProcedure.query(async ({ ctx: { entities, session } }) => {
    const user = await entities.user.findOneOrFail({ id: session.user.id })
    const cart = await entities.cart.find({ user })

    return cart.map(({ product: { id }, quantity }) => ({
      id,
      quantity,
    }))
  }),
})

export default cartsRouter
