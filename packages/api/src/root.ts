import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import usersRouter from "./router/users"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
<<<<<<< HEAD
=======
  categories: categoriesRouter,
>>>>>>> 024d1441d165ad40a3e35db80a68550316fcb1ee
  users: usersRouter,
})

export type AppRouter = typeof appRouter
