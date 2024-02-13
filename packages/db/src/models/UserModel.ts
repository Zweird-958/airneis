import { RelationMappings } from "objection"
import AddressModel from "packages/db/src/models/AddressModel"
import BaseModel from "packages/db/src/models/BaseModel"
import CartModel from "packages/db/src/models/CartModel"
import OrderModel from "packages/db/src/models/OrderModel"

class UserModel extends BaseModel {
  id: string
  createdAt: Date
  updatedAt: Date
  firstName: string
  lastName: string
  email: string
  password: string

  addresses?: AddressModel[]
  orders?: OrderModel[]
  cart?: CartModel[]

  static tableName = "users"

  static get relationMappings(): RelationMappings {
    return {
      addresses: {
        relation: BaseModel.HasManyRelation,
        modelClass: AddressModel,
        join: {
          from: "users.id",
          to: "addresses.userId",
        },
      },
      orders: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderModel,
        join: {
          from: "users.id",
          to: "orders.userId",
        },
      },
      cart: {
        relation: BaseModel.HasOneRelation,
        modelClass: CartModel,
        join: {
          from: "users.id",
          to: "carts.userId",
        },
      },
    }
  }
}

export default UserModel
