import type { EntityManager } from "@mikro-orm/core"
import { Seeder } from "@mikro-orm/seeder"
import fs from "node:fs/promises"
import path from "path"

import { PutObjectCommand, s3 } from "@airneis/s3"

import env from "../env"
import { CategoryFactory } from "../factories/CategoryFactory"
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

    let priority = 0

    new CategoryFactory(em)
      .each((category) => {
        category.image = categoryImage
        category.products.set(
          new ProductFactory(em)
            .each((product) => {
              product.images.set(productsImages)
              product.priority = priority
              priority += 1
            })
            .make(15),
        )
      })
      .make(10)
  }
}
