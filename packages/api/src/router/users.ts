import { hash } from "bcrypt"

import { signUpSchema } from "@airneis/schemas"

import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.entities.user.findOne({ email: input.email })

      if (user) {
        return false
      }

      const hashedPassword = await hash(input.password, env.HASH_SALT_COUNT)

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
