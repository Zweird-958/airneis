import { TRPCError } from "@trpc/server"
import { hash } from "bcrypt"
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken"
import { cookies } from "next/headers"
import React from "react"

import { ValidationTemplate } from "@airneis/email"
import {
  localeFallbackSchema,
  signUpSchema,
  validationAccountSchema,
} from "@airneis/schemas"
import { ValidationAccountJwt } from "@airneis/types"
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
        const locale = localeFallbackSchema.parse(cookies().get("lang")?.value)

        await ctx.resend.emails.send({
          from: env.RESEND_EMAIL_FROM,
          to: email,
          subject: "Activate your account",
          react: (
            <ValidationTemplate
              name={firstName}
              locale={locale}
              href={`${env.VERCEL_URL}/${locale}/users/validate-account/${jwt}`}
            />
          ),
        })

        return true
      },
    ),
  validateAccount: publicProcedure
    .input(validationAccountSchema)
    .mutation(async ({ ctx, input: { jwt } }) => {
      try {
        const {
          payload: {
            user: { id },
          },
        } = jsonwebtoken.verify(jwt, env.JWT_SECRET) as ValidationAccountJwt
        const user = await ctx.entities.user.findOneOrFail({ id })

        if (!user.isActive) {
          user.isActive = true

          await ctx.em.flush()
        }
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          throw new TRPCError({ code: "UNAUTHORIZED" })
        }
      }

      return true
    }),
})

export default usersRouter
