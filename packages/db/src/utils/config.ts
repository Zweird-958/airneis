import { z } from "zod"

const schema = z.object({
  images: z.object({
    folder: z.string().startsWith("/"),
    categories: z.string(),
    products: z.array(z.string()).nonempty(),
  }),
})
const config = schema.parse({
  images: {
    folder: "/images",
    categories: "categories.png",
    products: ["product1.png", "product2.png", "product3.png"],
  },
})

export default config
