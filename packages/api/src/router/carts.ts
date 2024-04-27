import { addToCartSchema, cartSchema } from "@airneis/schemas"
import { Id, Product } from "@airneis/types"

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
  saveLocale: authedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx: { entities, em, session }, input: localeCart }) => {
      const user = await entities.user.findOneOrFail({
        id: session.user.id,
      })
      const products = await entities.product.find({
        id: {
          $in: localeCart.map(({ id }) => id as Id),
        },
      })
      const productsInCart = await entities.cart.find({
        user,
        product: {
          $in: products,
        },
      })
      const productNotInCart = products.filter((product) =>
        productsInCart.find(
          ({ product: cartProduct }) => cartProduct.id === product.id,
        ),
      )

      for (const product of productsInCart) {
        const localeProduct = localeCart.find(
          ({ id }) => id === product.product.id,
        )

        if (!localeProduct) {
          continue
        }

        product.quantity = localeProduct.quantity
      }

      for (const product of productNotInCart) {
        const localeProduct = localeCart.find(({ id }) => id === product.id)

        if (!localeProduct) {
          continue
        }

        entities.cart.create({
          product,
          quantity: localeProduct.quantity,
          user,
        })
      }

      await em.flush()
    }),
})

export default cartsRouter
