import { Locale } from "@airneis/types"

import config from "../config"

const formatPrice = (lang: Locale, price: number) =>
  new Intl.NumberFormat(lang, {
    style: "currency",
    currency: config.currency,
  }).format(price / 100)

export default formatPrice
