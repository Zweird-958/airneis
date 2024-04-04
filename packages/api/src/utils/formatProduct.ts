import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import formatPrice from "./formatPrice"

const formatProduct = (
  { id, price, name, images, stock, priority, slug }: Product,
  lang: Locale,
) => ({
  id,
  outOfStock: stock === 0,
  imagesUrl: images.map(({ url }) => url),
  name: name[lang],
  priority,
  slug,
  price: formatPrice(lang, price),
})

export default formatProduct
