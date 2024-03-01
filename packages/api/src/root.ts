import userRouter from "packages/api/src/router/user"

import productsRouter from "./router/products"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
