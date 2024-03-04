import productsRouter from "./router/products"
import sessionsRouter from "./router/session"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  sessions: sessionsRouter,
})

export type AppRouter = typeof appRouter
