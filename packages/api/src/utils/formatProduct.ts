import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import formatPrice from "./formatPrice"

const util = (product: Product, lang: Locale) => {
  const base = {
    id: product.id,
    name: product.name[lang],
    outOfStock: product.stock === 0,
    price: formatPrice(lang, product.price),
  }

  return {
    category: {
      ...base,
      slug: product.slug,
      priority: product.priority,
      imagesUrl: product.images.map(({ url }) => url),
    },
    product: {
      ...base,
      description: product.description[lang],
      images: product.images.map(({ id, url }) => ({ id, url })),
      materials: product.materials.map(({ id, name }) => ({
        id,
        name: name[lang],
      })),
    },
  }
}

type FormatFor = "category" | "product"

const formatProduct = <T extends FormatFor>(
  product: Product,
  lang: Locale,
  formatFor: T,
) => util(product, lang)[formatFor]

export default formatProduct
