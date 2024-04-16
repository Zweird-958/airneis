import { Page, Slug } from "@airneis/schemas"

export const keys = {
  categories: (slug: Slug, page: Page) => `categories-${slug}-${page}`,
}
