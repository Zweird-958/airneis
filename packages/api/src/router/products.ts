import { ListObjectsCommand } from "@airneis/s3"

import { createTRPCRouter, publicProcedure } from "../trpc"

const productsRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx: { s3 } }) => {
    const result = await s3.send(
      new ListObjectsCommand({
        Bucket: "airneis-dev",
      }),
    )

    console.log("result", result.Contents)

    return {
      result: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
    }
  }),
})

export default productsRouter
