import { TRPCError } from "@trpc/server"
import { compare } from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import ms from "ms"
import { cookies } from "next/headers"

import { signInSchema } from "@airneis/schemas"
import { sleep } from "@airneis/utils"

import config from "../config"
import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const sessionsRouter = createTRPCRouter({
  create: publicProcedure.input(signInSchema).mutation(
    async ({
      input: { email, password },
      ctx: {
        entities: { user: UserEntity },
      },
    }) => {
      const user = await UserEntity.findOne({ email, isActive: true })

      if (!user) {
        await sleep(config.security.jwt.hashingDuration)

        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const passwordHash = await compare(password, user.password)

      if (!passwordHash) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const payload = {
        id: user.id,
        role: user.role,
      }
      const jwt = jsonwebtoken.sign(
        {
          payload,
        },
        env.JWT_SECRET,
        { expiresIn: config.security.jwt.expiresIn },
      )
      const cookieJwt = jsonwebtoken.sign({ payload: jwt }, env.JWT_SECRET, {
        expiresIn: config.security.jwt.expiresIn,
      })

      cookies().set(config.security.jwt.cookie.key, cookieJwt, {
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        secure: config.security.jwt.cookie.secure,
        expires: Date.now() + ms(config.security.jwt.expiresIn),
      })

      return { jwt, payload }
    },
  ),
  delete: publicProcedure.mutation(async () => {
    await cookies().set(config.security.jwt.cookie.key, "", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: config.security.jwt.cookie.secure,
      expires: Date.now() - ms("10 years"),
    })

    return true
  }),
})

export default sessionsRouter
