import { Product as ProductEntity } from "@airneis/db"

import { Image } from "./Image"
import { Material } from "./Material"

export type Product = {
  price: string
  name: string
  outOfStock: boolean
  imagesUrl: string[]
} & Pick<ProductEntity, "id" | "slug">

export type ProductDetail = {
  price: string
  name: string
  outOfStock: boolean
  description: string
  images: Image[]
  materials: Material[]
} & Pick<ProductEntity, "id">
