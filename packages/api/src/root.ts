import productsRouter from "./router/products"
import sessionRouter from "./router/session"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  session: sessionRouter,
})

export type AppRouter = typeof appRouter
