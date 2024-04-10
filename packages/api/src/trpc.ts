import { initTRPC } from "@trpc/server"
import superjson from "superjson"

import { em, entities } from "@airneis/db"
import { resend } from "@airneis/email"
import { keys, redis } from "@airneis/redis"
import { s3 } from "@airneis/s3"
import { Locale } from "@airneis/types"

import withOrm from "./middlewares/withOrm"

export const createTRPCContext = async (lang: Locale) => {
  if (!redis.isReady) {
    await redis.connect()
  }

  return {
    em,
    entities,
    s3,
    redis,
    cacheKeys: keys,
    lang,
    resend,
  }
}
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})
export type tRPCInit = typeof t
export const { createCallerFactory } = t
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure.use(withOrm(t))
