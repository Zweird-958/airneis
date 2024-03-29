import imagesRouter from "packages/api/src/router/images"

import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import sessionsRouter from "./router/sessions"
import usersRouter from "./router/users"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  users: usersRouter,
  sessions: sessionsRouter,
  images: imagesRouter,
})

export type AppRouter = typeof appRouter
