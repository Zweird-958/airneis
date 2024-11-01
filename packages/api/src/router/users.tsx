import { TRPCError } from "@trpc/server"
import { hash } from "bcrypt"
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken"
import React from "react"

import { getBaseUrl } from "@airneis/config"
import { ValidationTemplate, translations } from "@airneis/email"
import { signUpSchema, validationAccountSchema } from "@airneis/schemas"
import { ValidationAccountJwt } from "@airneis/types"
import { sleep } from "@airneis/utils"

import config from "../config"
import env from "../env"
import { publicProcedure } from "../procedures"
import { createTRPCRouter } from "../trpc"

const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(signUpSchema)
    .mutation(
      async ({
        ctx: { entities, em, resend, lang },
        input: { email, firstName, lastName, password },
      }) => {
        const user = await entities.user.findOne({ email })

        if (user) {
          await sleep(config.security.jwt.hashingDuration)

          return true
        }

        const hashedPassword = await hash(password, env.HASH_SALT_COUNT)
        const newUser = entities.user.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
        })

        await em.flush()

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

        await resend.emails.send({
          from: env.RESEND_EMAIL_FROM,
          to: email,
          subject: translations.validationTemplate.subject[lang],
          react: (
            <ValidationTemplate
              name={firstName}
              lang={lang}
              href={`${getBaseUrl()}/${lang}/users/validate-account/${jwt}`}
            />
          ),
        })

        return true
      },
    ),
  validateAccount: publicProcedure
    .input(validationAccountSchema)
    .mutation(async ({ ctx: { entities, em }, input: { jwt } }) => {
      try {
        const {
          payload: {
            user: { id },
          },
        } = jsonwebtoken.verify(jwt, env.JWT_SECRET) as ValidationAccountJwt
        const user = await entities.user.findOneOrFail({ id })

        if (!user.isActive) {
          user.isActive = true

          await em.flush()
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
