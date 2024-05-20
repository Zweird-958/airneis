import { TRPCError } from "@trpc/server"

import { getSingleProductSchema } from "@airneis/schemas"
import { ProductDetails } from "@airneis/types"

import { publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"
import formatProduct from "../utils/formatProduct"

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
  getSingle: publicProcedure
    .input(getSingleProductSchema)
    .query(
      async ({
        ctx: { entities, lang, redis, cacheKeys },
        input: { slug },
      }): Promise<GetSingleProductResult> => {
        const cacheKey = cacheKeys.product(lang, slug)
        const cachedProduct = await redis.get(cacheKey)

        if (cachedProduct) {
          return JSON.parse(cachedProduct)
        }

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

        const result = {
          result: formatProduct({ product }, lang, "product"),
        }

        await redis.set(cacheKey, JSON.stringify(result))

        return result
      },
    ),
})

export default productsRouter
