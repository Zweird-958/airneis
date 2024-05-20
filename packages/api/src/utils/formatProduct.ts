import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import formatPrice from "./formatPrice"
import getImageUrl from "./getImageUrl"

const util = (product: Product, lang: Locale, quantity: number) => {
  const base = {
    id: product.id,
    name: product.name[lang],
    outOfStock: product.stock === 0,
    price: formatPrice(lang, product.price * quantity),
  }

  return {
    category: {
      ...base,
      slug: product.slug,
      priority: product.priority,
      imagesUrl: product.images.map(({ url }) => getImageUrl(url)),
    },
    product: {
      ...base,
      description: product.description[lang],
      images: product.images.map(({ id, url }) => ({
        id,
        url: getImageUrl(url),
      })),
      materials: product.materials.map(({ id, name }) => ({
        id,
        name: name[lang],
      })),
    },
    checkout: {
      ...base,
      description: product.description[lang],
      quantity,
      images: product.images.map(({ id, url }) => ({
        id,
        url: getImageUrl(url),
      })),
    },
  }
}

type FormatFor = "category" | "product" | "checkout"

const formatProduct = <T extends FormatFor>(
  { product, quantity = 1 }: { product: Product; quantity?: number },
  lang: Locale,
  formatFor: T,
) => util(product, lang, quantity)[formatFor]

export default formatProduct
