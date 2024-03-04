import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import sessionsRouter from "./router/sessions"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  sessions: sessionsRouter,
})

export type AppRouter = typeof appRouter
