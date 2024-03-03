import categoryRouter from "./router/category"
import productRouter from "./router/product"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  product: productRouter,
  category: categoryRouter,
})

export type AppRouter = typeof appRouter
