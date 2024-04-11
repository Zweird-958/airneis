import categoriesRouter from "./router/categories"
import materialsRouter from "./router/materials"
import productsRouter from "./router/products"
import sessionsRouter from "./router/sessions"
import usersRouter from "./router/users"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  materials: materialsRouter,
  users: usersRouter,
  sessions: sessionsRouter,
})

export type AppRouter = typeof appRouter
