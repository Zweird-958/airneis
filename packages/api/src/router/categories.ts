import { createCategorySchema } from "@airneis/schemas"
import { Locale } from "@airneis/types"

import { createTRPCRouter, publicProcedure } from "../trpc"

const categoriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) => {
      const image = ctx.entities.image.create({ url: input.imageUrl })
      ctx.entities.category.create({
        name: input.name as Record<Locale, string>,
        description: input.description as Record<Locale, string>,
        image,
      })

      await ctx.em.flush()

      return true
    }),
})

export default categoriesRouter
