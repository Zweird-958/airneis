import { TRPCError } from "@trpc/server"

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
        const user = await entities.user.findOne({ id: session.user.id })

        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          })
        }

        const product = await entities.product.findOne({
          id: productId as Product["id"],
        })

        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
          })
        }

        const cartExists = await entities.cart.findOne({
          user,
          product,
        })

        if (cartExists) {
          cartExists.quantity += quantity
          await em.flush()

          return true
        }

        entities.cart.create({
          product,
          quantity,
          user,
        })

        await em.flush()

        return true
      },
    ),
  get: authedProcedure.query(async ({ ctx: { entities, session } }) => {
    const user = await entities.user.findOne({ id: session.user.id })

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      })
    }

    const cart = await entities.cart.find({ user })

    return cart.map(({ product: { id }, quantity }) => ({
      id,
      quantity,
    }))
  }),
  saveLocal: authedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx: { entities, em, session }, input: localCart }) => {
      const user = await entities.user.findOneOrFail({
        id: session.user.id,
      })
      const products = await entities.product.find({
        id: {
          $in: localCart.map(({ id }) => id as Id),
        },
      })
      const productsInCart = await entities.cart.find({
        user,
        product: {
          $in: products,
        },
      })
      const productsNotInCart = products.filter(
        (product) =>
          !productsInCart.find(
            ({ product: cartProduct }) => cartProduct.id !== product.id,
          ),
      )

      for (const product of productsInCart) {
        const localProduct = localCart.find(
          ({ id }) => id === product.product.id,
        )

        if (!localProduct) {
          continue
        }

        product.quantity = localProduct.quantity
      }

      for (const product of productsNotInCart) {
        const localProduct = localCart.find(({ id }) => id === product.id)

        if (!localProduct) {
          continue
        }

        entities.cart.create({
          product,
          quantity: localProduct.quantity,
          user,
        })
      }

      await em.flush()

      return true
    }),
})

export default cartsRouter