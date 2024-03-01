import { TRPCError } from "@trpc/server"
import { compare } from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import ms from "ms"
import { cookies } from "next/headers"

import { webConfig } from "@airneis/config"
import { signInSchema } from "@airneis/schemas"

import config from "../config"
import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const userRouter = createTRPCRouter({
  signIn: publicProcedure.input(signInSchema).mutation(
    async ({
      input: { email, password },
      ctx: {
        entities: { user: UserEntity },
      },
    }) => {
      const user = await UserEntity.findOne({ email })

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const passwordHash = await compare(password, user.password)

      if (!passwordHash) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: user.id,
              role: user.role,
            },
          },
        },
        env.JWT_SECRET,
        { expiresIn: config.security.jwt.expiresIn },
      )
      const cookieJwt = jsonwebtoken.sign({ payload: jwt }, env.JWT_SECRET, {
        expiresIn: config.security.jwt.expiresIn,
      })

      cookies().set(webConfig.security.session.cookie.key, cookieJwt, {
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        secure: webConfig.security.session.cookie.secure,
        expires: Date.now() + ms(config.security.jwt.expiresIn),
      })

      return jwt
    },
  ),
})

export default userRouter
