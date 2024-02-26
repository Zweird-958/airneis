import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core"

import { Address } from "./Address"
import { Cart } from "./Cart"
import { Order } from "./Order"
import { SoftBaseEntity } from "./SoftBaseEntity"

@Entity({ tableName: "users" })
export class User extends SoftBaseEntity {
  @Property({ type: "text", nullable: false })
  firstName: string

  @Property({ type: "text", nullable: false })
  lastName: string

  @Property({ type: "text", nullable: false, unique: true })
  email: string

  @Property({ type: "text", nullable: false })
  password: string

  @OneToMany({
    entity: () => Address,
    mappedBy: (address) => address.user,
    orphanRemoval: true,
  })
  addresses = new Collection<Address>(this)

  @OneToMany({
    entity: () => Order,
    mappedBy: (order) => order.user,
    orphanRemoval: true,
  })
  orders = new Collection<Order>(this)

  @OneToMany({
    entity: () => Cart,
    mappedBy: (cart) => cart.user,
    orphanRemoval: true,
  })
  cartItems = new Collection<Cart>(this)

  constructor({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    super()
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }
}
