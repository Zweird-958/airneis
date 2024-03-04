import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import sessionsRouter from "./router/session"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  sessions: sessionsRouter,
})

export type AppRouter = typeof appRouter
