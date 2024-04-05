import { getSingleProductSchema } from "@airneis/schemas"

import { createTRPCRouter, publicProcedure } from "../trpc"
import formatPrice from "../utils/formatPrice"

const productsRouter = createTRPCRouter({
  all: publicProcedure.query(() => ({
    result: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  })),
  getSingle: publicProcedure
    .input(getSingleProductSchema)
    .query(async ({ ctx: { entities, lang }, input: { slug } }) => {
      const product = await entities.product.findOneOrFail(
        { slug },
        { populate: ["images", "materials"] },
      )

      return {
        result: {
          id: product.id,
          name: product.name[lang],
          description: product.description[lang],
          price: formatPrice(lang, product.price),
          outOfStock: product.stock === 0,
          images: product.images.map(({ id, url }) => ({ id, url })),
          materials: product.materials.map(({ id, name }) => ({
            id,
            name: name[lang],
          })),
        },
      }
    }),
})

export default productsRouter
