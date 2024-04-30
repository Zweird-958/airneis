import categoriesRouter from "./router/categories"
import materialsRouter from "./router/materials"
import imagesRouter from "./router/images"
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
  images: imagesRouter,
})

export type AppRouter = typeof appRouter
