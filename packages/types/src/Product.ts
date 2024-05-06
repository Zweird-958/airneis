import { Product as ProductEntity } from "@airneis/db"

export type Product = {
  price: string
  name: string
  outOfStock: boolean
  imagesUrl: string[]
} & Pick<ProductEntity, "id" | "slug">
