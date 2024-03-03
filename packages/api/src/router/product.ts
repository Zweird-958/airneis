import { createTRPCRouter, publicProcedure } from "../trpc"

const productRouter = createTRPCRouter({
  all: publicProcedure.query(() => ({
    result: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  })),
})

export default productRouter
