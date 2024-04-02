import { fakerEN, fakerFR } from "@faker-js/faker"
import { Factory } from "@mikro-orm/seeder"

import { Product } from "../entities/Product"

export class ProductFactory extends Factory<Product> {
  model = Product

  definition(): Partial<Product> {
    return {
      name: {
        fr: fakerFR.commerce.productName(),
        en: fakerEN.commerce.productName(),
      },
      description: {
        fr: fakerFR.commerce.productDescription(),
        en: fakerEN.commerce.productDescription(),
      },
      price: fakerEN.number.int({ min: 100, max: 100000 }),
      stock: fakerEN.number.int({ min: 0, max: 10 }),
    }
  }
}
