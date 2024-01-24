import { type AppRouter, appRouter } from "./root"
import { createCallerFactory, createTRPCContext } from "./trpc"

export { createTRPCContext }
export { appRouter, type AppRouter }

export const createCaller = createCallerFactory(appRouter)
