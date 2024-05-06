import getImageUrl from "./getImageUrl"

import { Product } from "@airneis/db"
import { Locale } from "@airneis/types"

import config from "../config"

const formatProduct = (
  { id, price, name, images, stock, priority }: Product,
  lang: Locale,
) => ({
  id,
  outOfStock: stock === 0,
  imagesUrl: images.map(({ url }) => getImageUrl(url)),
  name: name[lang],
  priority,
  price: new Intl.NumberFormat(lang, {
    style: "currency",
    currency: config.currency,
  }).format(price / 100),
})

export default formatProduct
