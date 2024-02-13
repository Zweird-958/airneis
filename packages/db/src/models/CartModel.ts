import { RelationMappings } from "objection"
import BaseModel from "packages/db/src/models/BaseModel"
import ProductModel from "packages/db/src/models/ProductModel"
import UserModel from "packages/db/src/models/UserModel"

class CartModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string

  products?: ProductModel[]
  user?: UserModel

  static tableName = "carts"

  static get relationMappings(): RelationMappings {
    return {
      products: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "carts.id",
          through: {
            from: "link_carts_products.cartId",
            to: "link_carts_products.productId",
            extra: ["quantity"],
          },
          to: "products.id",
        },
      },
      // Est-ce réellement utile de créer cette relation ?
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "carts.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default CartModel
