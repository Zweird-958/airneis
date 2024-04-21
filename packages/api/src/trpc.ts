import { initTRPC } from "@trpc/server"
import { NextRequest } from "next/server"
import superjson from "superjson"

import { em, entities } from "@airneis/db"
import { resend } from "@airneis/email"
import { keys, redis } from "@airneis/redis"
import { s3 } from "@airneis/s3"
import { stripe } from "@airneis/stripe/server"
import { Locale } from "@airneis/types"

import withAuth from "./middlewares/withAuth"
import withOrm from "./middlewares/withOrm"

export const createTRPCContext = (req: NextRequest, lang: Locale) => ({
  req,
  em,
  entities,
  s3,
  redis,
  cacheKeys: keys,
  lang,
  resend,
  stripe,
})
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})
export type tRPCInit = typeof t
export const { createCallerFactory } = t
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure.use(withOrm(t))
export const authedProcedure = publicProcedure.use(withAuth(t, "USER"))
export const adminProcedure = publicProcedure.use(withAuth(t, "ADMIN"))
