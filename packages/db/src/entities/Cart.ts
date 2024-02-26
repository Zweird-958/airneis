import { Entity, ManyToOne, Property, type Rel } from "@mikro-orm/core"

import { Product } from "./Product"
import { User } from "./User"

@Entity({ tableName: "carts" })
export class Cart {
  @ManyToOne({ entity: () => User, primary: true })
  user: Rel<User>

  @ManyToOne({ entity: () => Product, primary: true })
  product: Rel<Product>

  @Property({ type: "integer", nullable: false })
  quantity: number

  constructor({
    user,
    product,
    quantity,
  }: {
    user: User
    product: Product
    quantity: number
  }) {
    this.user = user
    this.product = product
    this.quantity = quantity
  }
}
