import { initTRPC } from "@trpc/server"
import superjson from "superjson"

import { em, entities } from "@airneis/db"
import { resend } from "@airneis/email"
import { keys, redis } from "@airneis/redis"
import { s3 } from "@airneis/s3"
import { Locale } from "@airneis/types"

export const createTRPCContext = (lang: Locale) => ({
  em,
  entities,
  s3,
  redis,
  cacheKeys: keys,
  lang,
  resend,
})
export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})
export const { createCallerFactory } = t
export const createTRPCRouter = t.router
