import { Entity, ManyToOne, Property } from "@mikro-orm/core"

import { DeliveryCountry } from "./DeliveryCountry.js"
import { SoftBaseEntity } from "./SoftBaseEntity.js"
import { User } from "./User.js"

@Entity({ tableName: "addresses" })
export class Address extends SoftBaseEntity {
  @Property({ type: "text", nullable: false })
  fullName: string

  @Property({ type: "text", nullable: false })
  address: string

  @Property({ type: "text", nullable: false })
  postalCode: string

  @Property({ type: "text", nullable: false })
  city: string

  @Property({ type: "text", nullable: true, default: null })
  phoneNumber: string | null

  @Property({ type: "boolean", nullable: false, default: false })
  isFavorite: boolean

  @ManyToOne({ entity: () => DeliveryCountry })
  country!: DeliveryCountry

  @ManyToOne({ entity: () => User })
  user!: User

  constructor({
    fullName,
    address,
    postalCode,
    city,
    phoneNumber = null,
    isFavorite = false,
  }: {
    fullName: string
    address: string
    postalCode: string
    city: string
    phoneNumber: string | null
    isFavorite?: boolean
  }) {
    super()
    this.fullName = fullName
    this.address = address
    this.postalCode = postalCode
    this.city = city
    this.phoneNumber = phoneNumber
    this.isFavorite = isFavorite
  }
}
