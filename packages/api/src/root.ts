import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import usersRouter from "./router/users"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
