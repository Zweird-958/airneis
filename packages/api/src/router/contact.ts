import { adminProcedure, createTRPCRouter } from "packages/api/src/trpc"

import { createContactSchema } from "@airneis/schemas"

import { publicProcedure } from "../trpc"

const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(createContactSchema)
    .mutation(async ({ ctx, input: { email, subject, description } }) => {
      ctx.entities.contact.create({
        email,
        subject,
        description,
      })

      await ctx.em.flush()

      return true
    }),
  get: adminProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.entities.contact.find({})

    return contacts
  }),
})

export default contactRouter
