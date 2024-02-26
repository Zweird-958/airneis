import { initTRPC } from "@trpc/server"
import superjson from "superjson"

import { em, entities } from "@airneis/db"

import withOrm from "./middlewares/withOrm"

export const createTRPCContext = () => ({
  em,
  entities,
})
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})
export type tRPCInit = typeof t
export const { createCallerFactory } = t
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure.use(withOrm(t))
