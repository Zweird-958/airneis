import { adminProcedure, createTRPCRouter } from "packages/api/src/trpc"

import { createMessageSchema } from "@airneis/schemas"

import { publicProcedure } from "../trpc"

const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(createMessageSchema)
    .mutation(async ({ ctx, input: { email, subject, description } }) => {
      ctx.entities.message.create({
        email,
        subject,
        description,
      })

      await ctx.em.flush()

      return true
    }),
  get: adminProcedure.query(async ({ ctx }) => {
    const messages = await ctx.entities.message.find({})

    return messages
  }),
})

export default contactRouter
