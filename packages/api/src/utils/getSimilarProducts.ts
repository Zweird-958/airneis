import { Product, SqlEntityRepository, raw as rawFunc } from "@airneis/db"
import { ProductDetails } from "@airneis/types"

import config from "../config"

const getSimilarProducts = async (
  { id, categories }: Pick<ProductDetails, "id" | "categories">,
  productEntity: SqlEntityRepository<Product>,
  raw: typeof rawFunc,
) => {
  const limit = config.products.limitSimilarProducts
  const similarProducts = await productEntity.find(
    {
      id: { $ne: id },
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
          id: { $ne: id },
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
