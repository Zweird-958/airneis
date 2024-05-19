import categoriesRouter from "./router/categories"
import contactRouter from "./router/contact"
import imagesRouter from "./router/images"
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
  images: imagesRouter,
  contact: contactRouter,
})

export type AppRouter = typeof appRouter
