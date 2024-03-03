import { TRPCError } from "@trpc/server"

import { createCategorySchema } from "@airneis/schemas"
import { Locale } from "@airneis/types"

import { createTRPCRouter, publicProcedure } from "../trpc"

const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const categoryExists = await ctx.entities.category.findOne({
        name: input.name,
      })

      if (categoryExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category already exists",
        })
      }

      const image = ctx.entities.image.create({ url: input.imageUrl })

      /**
       * See https://github.com/colinhacks/zod/discussions/2069
       *
       * This is a workaround for a bug in zod where it doesn't correctly infer the type of Record<Locale, string>
       */
      ctx.entities.category.create({
        name: input.name as Record<Locale, string>,
        description: input.description as Record<Locale, string>,
        image,
      })

      await ctx.em.flush()

      return true
    }),
})

export default categoryRouter
