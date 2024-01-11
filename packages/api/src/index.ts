import { createCallerFactory, createTRPCContext } from "./trpc"
import { appRouter, type AppRouter } from "./root"

export { createTRPCContext }
export { appRouter, type AppRouter }

export const createCaller = createCallerFactory(appRouter)
