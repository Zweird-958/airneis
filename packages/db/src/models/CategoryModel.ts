import { RelationMappings } from "objection"
import BaseModel from "packages/db/src/models/BaseModel"
import ImageModel from "packages/db/src/models/ImageModel"
import ProductModel from "packages/db/src/models/ProductModel"

class CategoryModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  imageId: string

  image?: ImageModel
  products?: ProductModel[]

  static tableName = "categories"

  static get relationMappings(): RelationMappings {
    return {
      image: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ImageModel,
        join: {
          from: "categories.imageId",
          to: "images.id",
        },
      },
      products: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "categories.id",
          through: {
            from: "link_categories_products.categoryId",
            to: "link_categories_products.productId",
          },
          to: "products.id",
        },
      },
    }
  }
}

export default CategoryModel
