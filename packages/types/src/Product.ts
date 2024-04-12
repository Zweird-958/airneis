import { Id } from "./Common"

export type Product = {
  id: Id
  price: string
  name: string
  outOfStock: boolean
  slug: string
  imagesUrl: string[]
}
