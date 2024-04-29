import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import formatPrice from "./formatPrice"

const getBase = (p: Product, lang: Locale) => ({
  id: p.id,
  name: p.name[lang],
  outOfStock: p.stock === 0,
  price: formatPrice(lang, p.price),
})
const category = (p: Product, lang: Locale) => ({
  ...getBase(p, lang),
  slug: p.slug,
  priority: p.priority,
  imagesUrl: p.images.map(({ url }) => url),
})
const product = (p: Product, lang: Locale) => ({
  ...getBase(p, lang),
  description: p.description[lang],
  images: p.images.map(({ id, url }) => ({ id, url })),
  materials: p.materials.map(({ id, name }) => ({
    id,
    name: name[lang],
  })),
})
const similar = (p: Product, lang: Locale) => ({
  ...getBase(p, lang),
  slug: p.slug,
  imagesUrl: p.images.map(({ url }) => url),
})
const formatProductFor = {
  category,
  product,
  similar,
}

export default formatProductFor
