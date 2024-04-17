import { z } from "zod"

const schema = z.object({
  images: z.object({
    folder: z.string().startsWith("/"),
    categories: z.string(),
    products: z.string(),
  }),
})
const config = schema.parse({
  images: {
    folder: "/images",
    categories: "categories.png",
    products: "products.png",
  },
})

export default config
