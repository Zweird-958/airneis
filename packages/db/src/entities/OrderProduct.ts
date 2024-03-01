import { Entity, ManyToOne, Property, type Rel } from "@mikro-orm/core"

import { Order } from "./Order"
import { Product } from "./Product"

@Entity({ tableName: "link_orders_products" })
export class OrderProduct {
  @ManyToOne({ entity: () => Order, primary: true })
  order: Rel<Order>

  @ManyToOne({ entity: () => Product, primary: true })
  product: Rel<Product>

  @Property({ type: "integer", nullable: false })
  priceUnit: number

  @Property({ type: "integer", nullable: false })
  quantity: number

  constructor({
    order,
    product,
    priceUnit,
    quantity,
  }: {
    order: Order
    product: Product
    priceUnit: number
    quantity: number
  }) {
    this.order = order
    this.product = product
    this.priceUnit = priceUnit
    this.quantity = quantity
  }
}
