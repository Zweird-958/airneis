import { TRPCError } from "@trpc/server"

import { addToCartSchema, cartSchema } from "@airneis/schemas"
import { Id } from "@airneis/types"

import getProductInCart from "../middlewares/getProductInCart"
import { authedProcedure, publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"
import formatProductFor from "../utils/formatProductFor"

const cartsRouter = createTRPCRouter({
  add: publicProcedure
    .use(getProductInCart)
    .input(addToCartSchema)
    .mutation(
      async ({
        ctx: { entities, em, user, productInCart, product },
        input: { quantity },
      }) => {
        if (productInCart) {
          productInCart.quantity += quantity
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
  get: authedProcedure.query(async ({ ctx: { entities, user } }) => {
    const cart = await entities.cart.find({ user })

    return cart.map(({ product: { id }, quantity }) => ({
      id,
      quantity,
    }))
  }),
  saveLocal: authedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx: { entities, em, user }, input: localCart }) => {
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
          !productsInCart.some(
            ({ product: cartProduct }) => cartProduct.id === product.id,
          ),
      )

      for (const product of productsInCart) {
        const localProduct = localCart.find(
          ({ id }) => id === product.product.id,
        )

        if (!localProduct) {
          continue
        }

        product.quantity += localProduct.quantity
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
  checkout: publicProcedure
    .input(cartSchema)
    .query(async ({ ctx: { entities, lang }, input: cart }) => {
      const products = await entities.product.find(
        {
          id: {
            $in: cart.map(({ id }) => id as Id),
          },
        },
        { populate: ["images", "materials"] },
      )

      return {
        result: products.map((product) =>
          formatProductFor.checkout(
            product,
            lang,
            cart.find(({ id }) => id === product.id)?.quantity,
          ),
        ),
      }
    }),
  update: publicProcedure
    .use(getProductInCart)
    .input(addToCartSchema)
    .mutation(async ({ ctx: { em, productInCart }, input: { quantity } }) => {
      if (!productInCart) {
        throw new TRPCError({
          code: "NOT_FOUND",
        })
      }

      if (quantity <= 0) {
        await em.removeAndFlush(productInCart)

        return true
      }

      productInCart.quantity = quantity

      await em.flush()

      return true
    }),
})

export default cartsRouter
