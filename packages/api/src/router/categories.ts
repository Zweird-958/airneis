import { TRPCError } from "@trpc/server"
import getImageUrl from "../utils/getImageUrl"
import slugify from "slugify"

import { createCategorySchema, getCategorySchema } from "@airneis/schemas"
import type { Locale, Product } from "@airneis/types"

import config from "../config"
import env from "../env"
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc"
import formatProduct from "../utils/formatProduct"

type GetCategoryResult = {
  result: {
    imageUrl: string
    products: Product[]
    name: string
    description: string
  }
  meta: {
    count: number
    totalPages: number
  }
}

const categoriesRouter = createTRPCRouter({
  create: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input: { name, description, imageUrl } }) => {
      const categoryExists = await ctx.entities.category.findOne({
        name,
      })

      if (categoryExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category already exists",
        })
      }

      const image = ctx.entities.image.create({ url: imageUrl })

      /**
       * See https://github.com/colinhacks/zod/discussions/2069
       *
       * This is a workaround for a bug in zod where it doesn't correctly infer the type of Record<Locale, string>
       */
      ctx.entities.category.create({
        name: name as Record<Locale, string>,
        description: description as Record<Locale, string>,
        image,
        slug: slugify(name.en as string, { lower: true, replacement: "-" }),
      })

      await ctx.em.flush()

      return true
    }),
  get: publicProcedure
    .input(getCategorySchema)
    .query(
      async ({
        ctx: { entities, lang, redis, cacheKeys },
        input: { slug, page },
      }) => {
        const cacheKey = cacheKeys.categories(slug, page)
        const cache = await redis.get(cacheKey)

        if (cache) {
          return JSON.parse(cache) as GetCategoryResult
        }

        const category = await entities.category.findOneOrFail(
          { slug },
          { populate: ["image"] },
        )
        const [products, count] = await entities.product.findAndCount(
          { categories: { slug } },
          {
            populate: ["images"],
            orderBy: { stock: "DESC", priority: "DESC NULLS LAST" },
            populateWhere: { categories: { slug } },
            offset: (page - 1) * config.pagination.itemsPerPage,
            limit: config.pagination.itemsPerPage,
          },
        )
        const result = {
          result: {
            imageUrl: getImageUrl(category.image.url),
            products: products.map((product) => formatProduct(product, lang)),
            name: category.name[lang],
            description: category.description[lang],
          },
          meta: {
            count,
            totalPages: Math.ceil(count / config.pagination.itemsPerPage),
          },
        }

        await redis.set(cacheKey, JSON.stringify(result))

        return result
      },
    ),
})

export default categoriesRouter
