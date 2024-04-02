import { fakerEN, fakerFR } from "@faker-js/faker"
import { Factory } from "@mikro-orm/seeder"
import slugify from "slugify"

import { Product } from "../entities/Product"

export class ProductFactory extends Factory<Product> {
  model = Product

  definition(): Partial<Product> {
    const nameEN = fakerEN.commerce.productName()

    return {
      name: {
        fr: fakerFR.commerce.productName(),
        en: nameEN,
      },
      description: {
        fr: fakerFR.lorem.paragraphs({ min: 1, max: 5 }, "\n\n"),
        en: fakerEN.lorem.paragraphs({ min: 1, max: 5 }, "\n\n"),
      },
      price: fakerEN.number.int({ min: 3000, max: 100000 }),
      stock: fakerEN.number.int({ min: 0, max: 10 }),
      slug: slugify(nameEN, { lower: true, replacement: "-" }),
    }
  }
}
