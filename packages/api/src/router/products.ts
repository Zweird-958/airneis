import { TRPCError } from "@trpc/server"

import { getSingleProductSchema } from "@airneis/schemas"

import { createTRPCRouter, publicProcedure } from "../trpc"
import formatProduct from "../utils/formatProduct"

const productsRouter = createTRPCRouter({
  all: publicProcedure.query(() => ({
    result: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  })),
  getSingle: publicProcedure
    .input(getSingleProductSchema)
    .query(async ({ ctx: { entities, lang }, input: { slug } }) => {
      const product = await entities.product.findOne(
        { slug },
        { populate: ["images", "materials"] },
      )

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        })
      }

      return {
        result: formatProduct(product, lang, "product"),
      }
    }),
})

export default productsRouter
