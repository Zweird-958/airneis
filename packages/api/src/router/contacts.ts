import { createContactSchema } from "@airneis/schemas"

import { adminProcedure, publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"

const contactsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createContactSchema)
    .mutation(
      async ({
        ctx: { entities, em },
        input: { email, subject, description },
      }) => {
        entities.contact.create({
          email,
          subject,
          description,
        })

        await em.flush()

        return true
      },
    ),
  get: adminProcedure.query(async ({ ctx: { entities } }) => {
    const contacts = await entities.contact.find({})

    return contacts
  }),
})

export default contactsRouter
