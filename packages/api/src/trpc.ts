import { initTRPC } from "@trpc/server"
import superjson from "superjson"

export const createTRPCContext = () => ({
  models: {},
})
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})
export const { createCallerFactory } = t
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
