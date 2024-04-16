import type { Locale } from "@airneis/types"
import { translationInterpolator } from "@airneis/utils"

import categories from "@/locales/en/categories"
import common from "@/locales/en/common"
import products from "@/locales/en/products"
import categoriesFr from "@/locales/fr/categories"
import commonFr from "@/locales/fr/common"
import productsFr from "@/locales/fr/products"

export const translations = {
  en: {
    common,
    categories,
    products,
  },
  fr: {
    common: commonFr,
    categories: categoriesFr,
    products: productsFr,
  },
}
const getTranslations = (locale: Locale) => ({
  ...(translations[locale] as typeof translations.en),
  t: translationInterpolator,
})

export default getTranslations
