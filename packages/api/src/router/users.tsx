import { hash } from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { cookies } from "next/headers"
import React from "react"

import { ValidationTemplate } from "@airneis/email"
import { signUpSchema } from "@airneis/schemas"
import { sleep } from "@airneis/utils"

import config from "../config"
import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(
      async ({ ctx, input: { email, firstName, lastName, password } }) => {
        const user = await ctx.entities.user.findOne({ email })

        if (user) {
          await sleep(config.security.jwt.hashingDuration)

          return true
        }

        const hashedPassword = await hash(password, env.HASH_SALT_COUNT)
        const newUser = ctx.entities.user.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
        })

        await ctx.em.flush()

        const jwt = jsonwebtoken.sign(
          {
            payload: {
              user: {
                id: newUser.id,
              },
            },
          },
          env.JWT_SECRET,
          { expiresIn: config.security.jwt.expiresIn },
        )
        const lang = cookies().get("lang")

        await ctx.resend.emails.send({
          from: env.RESEND_EMAIL_FROM,
          to: email,
          subject: "Activate your account",
          react: (
            <ValidationTemplate
              name={firstName}
              href={`http://localhost:3000/${lang?.value}/users/validateAccount/${jwt}`}
            />
          ),
        })

        return true
      },
    ),
})

export default usersRouter
