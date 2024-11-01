import { Product } from "@airneis/db"
import { Locale, ProductDetails } from "@airneis/types"

import formatPrice from "./formatPrice"
import getImageUrl from "./getImageUrl"

const getBase = (product: Product, lang: Locale, quantity = 1) => ({
  id: product.id,
  name: product.name[lang],
  outOfStock: product.stock === 0,
  price: formatPrice(lang, product.price * quantity),
})
const category = (product: Product, lang: Locale) => ({
  ...getBase(product, lang),
  slug: product.slug,
  priority: product.priority,
  imagesUrl: product.images.map(({ url }) => getImageUrl(url)),
})
const single = (
  product: Product,
  lang: Locale,
): Omit<ProductDetails, "similarProducts"> => ({
  ...getBase(product, lang),
  description: product.description[lang],
  images: product.images.map(({ id, url }) => ({ id, url: getImageUrl(url) })),
  materials: product.materials.map(({ id, name }) => ({
    id,
    name: name[lang],
  })),
  categories: product.categories.map(({ id }) => id),
})
const similar = (product: Product, lang: Locale) => ({
  ...getBase(product, lang),
  slug: product.slug,
  imagesUrl: product.images.map(({ url }) => getImageUrl(url)),
})
const checkout = (product: Product, lang: Locale, quantity = 1) => ({
  ...getBase(product, lang, quantity),
  description: product.description[lang],
  imageUrl: getImageUrl(product.images[0].url),
  quantity,
})
const formatProductFor = {
  category,
  single,
  similar,
  checkout,
}

export default formatProductFor
