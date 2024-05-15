import { Product, SqlEntityRepository, raw as rawFunc } from "@airneis/db"

import config from "../config"

const getSimilarProducts = async (
  productEntity: SqlEntityRepository<Product>,
  product: Product,
  raw: typeof rawFunc,
) => {
  const limit = config.products.limitSimilarProducts
  const categories = product.categories.map((category) => category.id)
  const similarProducts = await productEntity.find(
    {
      id: { $ne: product.id },
      categories,
      stock: { $gt: 0 },
    },
    {
      limit,
      orderBy: { [raw("RANDOM()")]: "" },
      populate: ["images"],
    },
  )

  if (similarProducts.length < limit) {
    similarProducts.push(
      ...(await productEntity.find(
        {
          id: { $ne: product.id },
          categories,
          stock: { $eq: 0 },
        },
        {
          limit: limit - similarProducts.length,
          orderBy: { [raw("RANDOM()")]: "" },
          populate: ["images"],
        },
      )),
    )
  }

  return similarProducts
}

export default getSimilarProducts
