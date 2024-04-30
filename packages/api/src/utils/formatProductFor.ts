import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import formatPrice from "./formatPrice"

const getBase = (product: Product, lang: Locale) => ({
  id: product.id,
  name: product.name[lang],
  outOfStock: product.stock === 0,
  price: formatPrice(lang, product.price),
})
const category = (product: Product, lang: Locale) => ({
  ...getBase(product, lang),
  slug: product.slug,
  priority: product.priority,
  imagesUrl: product.images.map(({ url }) => url),
})
const single = (product: Product, lang: Locale) => ({
  ...getBase(product, lang),
  description: product.description[lang],
  images: product.images.map(({ id, url }) => ({ id, url })),
  materials: product.materials.map(({ id, name }) => ({
    id,
    name: name[lang],
  })),
})
const similar = (product: Product, lang: Locale) => ({
  ...getBase(product, lang),
  slug: product.slug,
  imagesUrl: product.images.map(({ url }) => url),
})
const formatProductFor = {
  category,
  single,
  similar,
}

export default formatProductFor
