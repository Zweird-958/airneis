import productsRouter from "./router/products"
import usersRouter from "./router/users"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
