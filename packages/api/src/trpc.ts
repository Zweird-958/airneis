import { initTRPC } from "@trpc/server"
import superjson from "superjson"

import { em, user } from "@airneis/db"

export const createTRPCContext = () => ({
  em,
  models: {
    user,
  },
})
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})
export const { createCallerFactory } = t
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
