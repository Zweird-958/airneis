import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import usersRouter from "./router/users"
import sessionsRouter from "./router/sessions"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  users: usersRouter,
  sessions: sessionsRouter,
})

export type AppRouter = typeof appRouter
