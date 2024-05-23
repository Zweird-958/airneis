import { Locale } from "@airneis/config"
import { Page, Slug } from "@airneis/schemas"

export const keys = {
  categories: (lang: Locale, slug: Slug, page: Page) =>
    `categories-${lang}-${slug}-${page}`,
  product: (lang: Locale, slug: Slug) => `product-${lang}-${slug}`,
}
