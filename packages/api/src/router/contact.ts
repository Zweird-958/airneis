import { createContactSchema } from "@airneis/schemas"

import { adminProcedure, publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"

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
