import { RelationMappings } from "objection"
import AddressModel from "packages/db/src/models/AddressModel"
import BaseModel from "packages/db/src/models/BaseModel"
import ProductModel from "packages/db/src/models/ProductModel"
import UserModel from "packages/db/src/models/UserModel"

class OrderModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  status: "CANCELLED" | "DELIVERED" | "ONGOING"
  total: number
  vat: number
  deliveryAddressId: string
  billingAddressId: string
  userId: string

  deliveryAddress?: AddressModel
  billingAddress?: AddressModel
  products?: ProductModel[]
  user?: UserModel

  static tableName = "orders"

  static get relationMappings(): RelationMappings {
    return {
      deliveryAddress: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: AddressModel,
        join: {
          from: "orders.deliveryAddressId",
          to: "addresses.id",
        },
      },
      billingAddress: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: AddressModel,
        join: {
          from: "orders.billingAddressId",
          to: "addresses.id",
        },
      },
      products: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "orders.id",
          through: {
            from: "link_orders_products.orderId",
            to: "link_orders_products.productId",
            extra: ["priceUnit, quantity"],
          },
          to: "products.id",
        },
      },
      // Est-ce réellement utile de créer cette relation ?
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "orders.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default OrderModel
