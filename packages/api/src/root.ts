import cartsRouter from "./router/carts"
import categoriesRouter from "./router/categories"
import imagesRouter from "./router/images"
import materialsRouter from "./router/materials"
import productsRouter from "./router/products"
import usersRouter from "./router/users"
import sessionsRouter from "./router/sessions"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
  users: usersRouter,
  sessions: sessionsRouter,
  images: imagesRouter,
  carts: cartsRouter,
})

export type AppRouter = typeof appRouter
