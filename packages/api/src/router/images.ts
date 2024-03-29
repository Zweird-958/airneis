import { PutObjectCommand } from "@airneis/s3"
import { imageSchema } from "@airneis/schemas"

import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const imagesRouter = createTRPCRouter({
  create: publicProcedure
    .input(imageSchema)
    .mutation(async ({ ctx: { s3 }, input: { buffer, type } }) => {
      const name = Date.now().toString()

      await s3.send(
        new PutObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: `categories/${name}`,
          ContentType: type,
          Body: buffer,
        }),
      )

      return `categories/${name}`
    }),
})

export default imagesRouter
