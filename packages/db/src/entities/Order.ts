import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  type Rel,
} from "@mikro-orm/core"

import { OrderStatus } from "@airneis/types/Order"

import { Address } from "./Address.js"
import { BaseEntity } from "./BaseEntity.js"
import { OrderProduct } from "./OrderProduct.js"
import { User } from "./User.js"

@Entity({ tableName: "orders" })
export class Order extends BaseEntity {
  @Enum({
    nullable: false,
    nativeEnumName: "order_status",
    items: () => OrderStatus,
  })
  status: OrderStatus

  @Property({ type: "integer", nullable: false })
  total: number

  @Property({ type: "float", nullable: false })
  vat: number

  @ManyToOne({ entity: () => Address })
  deliveryAddress: Rel<Address>

  @ManyToOne({ entity: () => Address })
  billingAddress: Rel<Address>

  @ManyToOne({ entity: () => User })
  user: Rel<User>

  @OneToMany({
    entity: () => OrderProduct,
    mappedBy: (orderProduct) => orderProduct.order,
    orphanRemoval: true,
  })
  items = new Collection<OrderProduct>(this)

  constructor({
    status,
    total,
    vat,
    deliveryAddress,
    billingAddress,
    user,
  }: {
    status: OrderStatus
    total: number
    vat: number
    deliveryAddress: Address
    billingAddress: Address
    user: User
  }) {
    super()
    this.status = status
    this.total = total
    this.vat = vat
    this.deliveryAddress = deliveryAddress
    this.billingAddress = billingAddress
    this.user = user
  }
}
