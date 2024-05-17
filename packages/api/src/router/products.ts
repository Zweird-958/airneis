import { TRPCError } from "@trpc/server"

import { getSingleProductSchema } from "@airneis/schemas"
import { ProductDetails } from "@airneis/types"

import { publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"
import formatProductFor from "../utils/formatProductFor"
import getSimilarProducts from "../utils/getSimilarProducts"

type GetSingleProductResult = {
  result: ProductDetails
}

const productsRouter = createTRPCRouter({
  all: publicProcedure.query(() => ({
    result: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  })),
  getSingle: publicProcedure.input(getSingleProductSchema).query(
    async ({
      ctx: {
        entities: { product: productEntity },
        lang,
        redis,
        cacheKeys,
        raw,
      },
      input: { slug },
    }): Promise<GetSingleProductResult> => {
      const cacheKey = cacheKeys.product(lang, slug)
      const cachedProduct = await redis.get(cacheKey)

      if (cachedProduct) {
        return JSON.parse(cachedProduct)
      }

      const product = await productEntity.findOne(
        { slug },
        { populate: ["images", "materials", "categories"] },
      )

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        })
      }

      const similarProducts = await getSimilarProducts(
        productEntity,
        product,
        raw,
      )
      const result = {
        result: {
          ...formatProductFor.single(product, lang),
          similarProducts: similarProducts.map((similarProduct) =>
            formatProductFor.similar(similarProduct, lang),
          ),
        },
      }

      await redis.set(cacheKey, JSON.stringify(result))

      return result
    },
  ),
})

export default productsRouter
