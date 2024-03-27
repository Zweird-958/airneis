import { TRPCError } from "@trpc/server"

import { PutObjectCommand, s3 } from "@airneis/s3"
import { createCategorySchema } from "@airneis/schemas"
import { Locale } from "@airneis/types"

import env from "../env"
import { createTRPCRouter, publicProcedure } from "../trpc"

const categoriesRouter = createTRPCRouter({
  create: publicProcedure.input(createCategorySchema).mutation(
    async ({
      ctx,
      input: {
        name,
        description,
        image: { buffer, type },
      },
    }) => {
      const categoryExists = await ctx.entities.category.findOne({
        name,
      })

      if (categoryExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category already exists",
        })
      }

      await s3.send(
        new PutObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: `categories/${name.en}`,
          ContentType: type,
          Body: buffer,
        }),
      )

      const image = ctx.entities.image.create({ url: `categories/${name.en}` })

      /**
       * See https://github.com/colinhacks/zod/discussions/2069
       *
       * This is a workaround for a bug in zod where it doesn't correctly infer the type of Record<Locale, string>
       */
      ctx.entities.category.create({
        name: name as Record<Locale, string>,
        description: description as Record<Locale, string>,
        image,
      })

      await ctx.em.flush()

      return true
    },
  ),
})

export default categoriesRouter
