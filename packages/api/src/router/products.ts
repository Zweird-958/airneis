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
      const product = await entities.product.findOneOrFail(
        { slug },
        { populate: ["images", "materials"] },
      )

      return {
        result: formatProduct(product, lang, "product"),
      }
    }),
})

export default productsRouter
