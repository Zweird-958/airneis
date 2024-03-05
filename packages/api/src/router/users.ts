import { hash } from "bcrypt"

import { signUpSchema } from "@airneis/schemas"

import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(
      async ({ ctx, input: { email, firstName, lastName, password } }) => {
        const user = await ctx.entities.user.findOne({ email })

        if (user) {
          return false
        }

        const hashedPassword = await hash(password, env.HASH_SALT_COUNT)

        ctx.entities.user.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
        })
        await ctx.em.flush()

        return true
      },
    ),
})

export default usersRouter
