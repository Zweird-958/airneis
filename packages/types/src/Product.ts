import { Category, Product as ProductEntity } from "@airneis/db"

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
  similarProducts: Product[]
  categories: ProductEntity["id"][]
} & Base

export type CheckoutProduct = {
  quantity: number
  imageUrl: string
} & Pick<ProductDetails, "description"> &
  Base

export type SearchProduct = {
  category: Category["name"]
  imageUrl: string
} & Pick<ProductEntity, "name" | "id" | "description">
