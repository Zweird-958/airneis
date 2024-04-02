import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import config from "../config"

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
  price: new Intl.NumberFormat(lang, {
    style: "currency",
    currency: config.currency,
  }).format(price / 100),
})

export default formatProduct
