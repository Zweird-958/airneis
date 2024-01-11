import productsRouter from "./router/products"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
})

export type AppRouter = typeof appRouter
