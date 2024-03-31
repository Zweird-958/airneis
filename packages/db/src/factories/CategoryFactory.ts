import { fakerEN, fakerFR } from "@faker-js/faker"
import { Factory } from "@mikro-orm/seeder"
import slugify from "slugify"

import { Category } from "../entities/Category"

export class CategoryFactory extends Factory<Category> {
  model = Category

  definition(): Partial<Category> {
    const nameEN = fakerEN.commerce.productName()

    return {
      name: {
        fr: fakerFR.commerce.productName(),
        en: nameEN,
      },
      description: {
        fr: fakerFR.commerce.productDescription(),
        en: fakerEN.commerce.productDescription(),
      },
      slug: slugify(nameEN, { lower: true, replacement: "-" }),
    }
  }
}
