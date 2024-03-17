import type { EntityManager } from "@mikro-orm/core"
import { Seeder } from "@mikro-orm/seeder"

import { CategoryFactory } from "../factories/CategoryFactory"
import { ProductFactory } from "../factories/ProductFactory"
import { Image } from "./../entities/Image"

export class CategorySeeder extends Seeder {
  run(em: EntityManager) {
    const image = em.getRepository(Image).create({
      url: "https://www.ikea.com/fr/fr/images/products/lisabo-table-plaque-frene__1221247_pe913674_s5.jpg",
    })

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
            })
            .make(15),
        )
      })
      .make(10)
  }
}
