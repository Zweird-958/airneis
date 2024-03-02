import { hash } from "bcrypt"
import { createTRPCRouter, publicProcedure } from "packages/api/src/trpc"

import { signUpSchema } from "@airneis/schemas"

const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.entities.user.findOne({ email: input.email })

      if (user) {
        return false
      }

      const hashedPassword = await hash(input.password, 12)

      ctx.entities.user.create({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: hashedPassword,
      })
      await ctx.em.flush()

      return true
    }),
})

export default usersRouter
