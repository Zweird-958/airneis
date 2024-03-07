import { type AppRouter, appRouter } from "./src/root"
import { createCallerFactory, createTRPCContext } from "./src/trpc"

export { createTRPCContext }
export { appRouter, type AppRouter }

export const createCaller = createCallerFactory(appRouter)
