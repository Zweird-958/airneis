import { TRPCError } from "@trpc/server"
import { adminProcedure, createTRPCRouter } from "../trpc"
import { Locale } from "packages/config"

import { createMaterialSchema } from "@airneis/schemas"

const materialsRouter = createTRPCRouter({
  create: adminProcedure
    .input(createMaterialSchema)
    .mutation(async ({ ctx, input: { name } }) => {
      const materialExists = await ctx.entities.material.findOne({
        name,
      })

      if (materialExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Material already exists",
        })
      }

      ctx.entities.material.create({
        name: name as Record<Locale, string>,
      })

      await ctx.em.flush()

      return true
    }),
})

export default materialsRouter
