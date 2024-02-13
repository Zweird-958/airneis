import { RelationMappings } from "objection"
import BaseModel from "packages/db/src/models/BaseModel"
import ProductModel from "packages/db/src/models/ProductModel"

class MaterialModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string

  products?: ProductModel[]

  static tableName = "materials"

  static get relationMappings(): RelationMappings {
    return {
      // Est-ce réellement utile de créer cette relation ?
      products: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "materials.id",
          through: {
            from: "link_materials_products.materialId",
            to: "link_materials_products.productId",
          },
          to: "products.id",
        },
      },
    }
  }
}

export default MaterialModel
