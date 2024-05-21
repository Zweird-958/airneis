import { fakerEN, fakerFR } from "@faker-js/faker"
import { Factory } from "@mikro-orm/seeder"

import { Material } from "../entities/Material"

export class MaterialFactory extends Factory<Material> {
  model = Material

  definition(): Partial<Material> {
    return {
      name: {
        fr: fakerFR.commerce.productMaterial(),
        en: fakerEN.commerce.productMaterial(),
      },
    }
  }
}
