import { TRPCError } from "@trpc/server"

import { getSingleProductSchema, searchProductsSchema } from "@airneis/schemas"
import { ProductDetails, SearchProduct } from "@airneis/types"

import config from "../config"
import { publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"
import formatProductFor from "../utils/formatProductFor"
import getImageUrl from "../utils/getImageUrl"
import getSimilarProducts from "../utils/getSimilarProducts"

type GetSingleProductResult = {
  result: Omit<ProductDetails, "categories">
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
      let product: Omit<ProductDetails, "similarProducts"> | null = null

      if (cachedProduct) {
        product = JSON.parse(cachedProduct) as Omit<
          ProductDetails,
          "similarProducts"
        >
      } else {
        const dbProduct = await productEntity.findOne(
          { slug },
          { populate: ["images", "materials", "categories"] },
        )

        if (!dbProduct) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Product not found",
          })
        }

        product = formatProductFor.single(dbProduct, lang)

        await redis.set(cacheKey, JSON.stringify(product))
      }

      const similarProducts = await getSimilarProducts(
        { id: product.id, categories: product.categories },
        productEntity,
        raw,
      )
      // To avoid sending the categories to the client
      const { categories: _, ...formatedProduct } = product

      return {
        result: {
          ...formatedProduct,
          similarProducts: similarProducts.map((similarProduct) =>
            formatProductFor.similar(similarProduct, lang),
          ),
        },
      }
    },
  ),
  search: publicProcedure
    .input(searchProductsSchema)
    .mutation(
      async ({ ctx: { meilisearch, indexes, lang }, input: { query } }) => {
        const productIndex = meilisearch.index(indexes.products)
        await productIndex.updateSearchableAttributes([
          "name",
          "description",
          "category",
        ])
        const result = await productIndex.search<SearchProduct>(query, {
          limit: config.products.limitSearchResults,
        })

        return {
          result: result.hits.map(
            ({ name, description, imageUrl, ...hit }) => ({
              ...hit,
              imageUrl: getImageUrl(imageUrl),
              name: name[lang],
              description: description[lang],
            }),
          ),
        }
      },
    ),
})

export default productsRouter
