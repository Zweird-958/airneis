import { faker } from "@faker-js/faker"
import type { EntityManager } from "@mikro-orm/core"
import { Seeder } from "@mikro-orm/seeder"

import { CategoryFactory } from "../factories/CategoryFactory"
import { MaterialFactory } from "../factories/MaterialFactory"
import { ProductFactory } from "../factories/ProductFactory"
import { Image } from "./../entities/Image"

export class CategorySeeder extends Seeder {
  run(em: EntityManager) {
    const image = em.getRepository(Image).create({
      url: "https://www.ikea.com/fr/fr/images/products/lisabo-table-plaque-frene__1221247_pe913674_s5.jpg",
    })
    const materials = new MaterialFactory(em).make(10)

    let priority = 0

    new CategoryFactory(em)
      .each((category) => {
        category.image = image
        category.products.set(
          new ProductFactory(em)
            .each((product) => {
              product.images.set([image])
              product.priority = priority
              priority += 1
              product.materials.set(
                materials.slice(
                  faker.number.int({ min: 0, max: materials.length / 2 }),
                  faker.number.int({
                    min: materials.length / 2,
                    max: materials.length,
                  }),
                ),
              )
            })
            .make(15),
        )
      })
      .make(10)
  }
}
