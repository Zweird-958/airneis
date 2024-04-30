import { getSingleProductSchema } from "@airneis/schemas"

import config from "../config"
import { createTRPCRouter, publicProcedure } from "../trpc"
import formatProductFor from "../utils/formatProductFor"

const productsRouter = createTRPCRouter({
  all: publicProcedure.query(() => ({
    result: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  })),
  getSingle: publicProcedure
    .input(getSingleProductSchema)
    .query(async ({ ctx: { entities, lang, raw }, input: { slug } }) => {
      const product = await entities.product.findOneOrFail(
        { slug },
        { populate: ["images", "materials", "categories"] },
      )
      const limit = config.products.limitSimilarProducts
      const categories = product.categories.map((category) => category.id)
      let similarProducts = await entities.product.find(
        {
          id: { $ne: product.id },
          categories,
          stock: { $gt: 0 },
        },
        {
          limit,
          orderBy: { [raw("RANDOM()")]: "" },
          populate: ["images"],
        },
      )

      if (similarProducts.length < limit) {
        similarProducts = [
          ...similarProducts,
          ...(await entities.product.find(
            {
              id: { $ne: product.id },
              categories,
              stock: { $eq: 0 },
            },
            {
              limit: limit - similarProducts.length,
              orderBy: { [raw("RANDOM()")]: "" },
              populate: ["images"],
            },
          )),
        ]
      }

      return {
        result: {
          ...formatProductFor.product(product, lang),
          similarProducts: similarProducts.map((similarProduct) =>
            formatProductFor.similar(similarProduct, lang),
          ),
        },
      }
    }),
})

export default productsRouter
