import { Product as DbProduct } from "@airneis/db"

export type Product = {
  price: string
  name: string
  outOfStock: boolean
  imagesUrl: string[]
} & Pick<DbProduct, "id" | "slug">
