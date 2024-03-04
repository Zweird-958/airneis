import categoriesRouter from "./router/categories"
import productsRouter from "./router/products"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  products: productsRouter,
  categories: categoriesRouter,
})

export type AppRouter = typeof appRouter
