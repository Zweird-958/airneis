import { createCallerFactory } from "packages/api/src/trpc"
import { appRouter, type AppRouter } from "./root"

export { createTRPCContext } from "./trpc"
export { appRouter, type AppRouter }

export const createCaller = createCallerFactory(appRouter)
