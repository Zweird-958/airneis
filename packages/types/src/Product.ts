import { Product as ProductEntity } from "@airneis/db"

import { Image } from "./Image"
import { Material } from "./Material"

export type Base = {
  id: ProductEntity["id"]
  name: string
  outOfStock: boolean
  price: string
}

export type Product = {
  slug: ProductEntity["slug"]
  imagesUrl: string[]
} & Base

export type ProductDetails = {
  description: string
  images: Image[]
  materials: Material[]
} & Base
