import { DeleteObjectCommand, PutObjectCommand } from "@airneis/s3"
import { imageUrlSchema } from "@airneis/schemas"

import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { imageSchema } from "../utils/schemas"

const imagesRouter = createTRPCRouter({
  create: publicProcedure
    .input(imageSchema)
    .mutation(async ({ ctx: { s3 }, input: { buffer, type, folderName } }) => {
      const name = Date.now().toString()

      await s3.send(
        new PutObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: `categories/${name}`,
          ContentType: type,
          Body: buffer,
        }),
      )

      return `${folderName}/${name}`
    }),
  delete: publicProcedure
    .input(imageUrlSchema)
    .mutation(async ({ ctx: { s3 }, input }) => {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: input,
        }),
      )

      return true
    }),
})

export default imagesRouter
