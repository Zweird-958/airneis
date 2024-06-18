import { faker } from "@faker-js/faker"
import type { EntityManager } from "@mikro-orm/core"
import { Seeder } from "@mikro-orm/seeder"
import fs from "node:fs/promises"
import path from "path"

import { indexes, meilisearch } from "@airneis/meilisearch"
import { PutObjectCommand, s3 } from "@airneis/s3"

import env from "../env"
import { CategoryFactory } from "../factories/CategoryFactory"
import { MaterialFactory } from "../factories/MaterialFactory"
import { ProductFactory } from "../factories/ProductFactory"
import config from "../utils/config"
import { Image } from "./../entities/Image"

const uploadImage =
  (em: EntityManager) => async (folderName: string, fileName: string) => {
    const file = await fs.readFile(
      path.resolve(__dirname, `.${config.images.folder}/${fileName}`),
    )
    const name = Date.now().toString()
    const imageUrl = `${folderName}/${name}`

    await s3.send(
      new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: imageUrl,
        ContentType: `image/${path.extname(fileName).slice(1)}`,
        Body: file,
      }),
    )

    return em.getRepository(Image).create({
      url: imageUrl,
    })
  }

export class CategorySeeder extends Seeder {
  async run(em: EntityManager) {
    const upload = uploadImage(em)
    const categoryImage = await upload("categories", config.images.categories)
    const productsImages = await Promise.all(
      config.images.products.map((image) => upload("products", image)),
    )
    const materials = new MaterialFactory(em).make(10)

    let priority = 0

    new CategoryFactory(em)
      .each((category) => {
        category.image = categoryImage

        const products = new ProductFactory(em)
          .each((product) => {
            product.images.set(productsImages)
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
          .make(15)

        category.products.set(products)
        const productsParsed = products.map(
          ({ id, name, description, images }) => ({
            id,
            name,
            description,
            category: category.name,
            imageUrl: images[0].url,
          }),
        )

        meilisearch.index(indexes.products).addDocuments(productsParsed)
      })
      .make(10)
  }
}
