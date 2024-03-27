import { TRPCError } from "@trpc/server"
import slugify from "slugify"

import { createCategorySchema, getCategorySchema } from "@airneis/schemas"
import { Locale } from "@airneis/types"

import config from "../config"
import { createTRPCRouter, publicProcedure } from "../trpc"
import formatProduct from "../utils/formatProduct"

const categoriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input: { name, imageUrl, description } }) => {
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
    .query(async ({ ctx: { entities, lang }, input: { slug, page } }) => {
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

      return {
        result: {
          imageUrl: category.image.url,
          products: products.map((product) => formatProduct(product, lang)),
          name: category.name[lang],
          description: category.description[lang],
        },
        meta: {
          count,
          totalPages: Math.ceil(count / config.pagination.itemsPerPage),
        },
      }
    }),
})

export default categoriesRouter
