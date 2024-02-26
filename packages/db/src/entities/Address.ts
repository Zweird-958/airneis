import { Entity, ManyToOne, OptionalProps, Property } from "@mikro-orm/core"

import { DeliveryCountry } from "./DeliveryCountry"
import { SoftBaseEntity } from "./SoftBaseEntity"
import { User } from "./User"

@Entity({ tableName: "addresses" })
export class Address extends SoftBaseEntity {
  [OptionalProps]?: "isFavorite" | "phoneNumber"

  @Property({ type: "text", nullable: false })
  fullName: string

  @Property({ type: "text", nullable: false })
  address: string

  @Property({ type: "text", nullable: false })
  postalCode: string

  @Property({ type: "text", nullable: false })
  city: string

  @Property({ type: "text", nullable: true, default: null })
  phoneNumber: string | null = null

  @Property({ type: "boolean", nullable: false, default: false })
  isFavorite = false

  @ManyToOne({ entity: () => DeliveryCountry })
  country: DeliveryCountry

  @ManyToOne({ entity: () => User })
  user: User

  constructor({
    fullName,
    address,
    postalCode,
    city,
    country,
    user,
  }: {
    fullName: string
    address: string
    postalCode: string
    city: string
    country: DeliveryCountry
    user: User
  }) {
    super()
    this.fullName = fullName
    this.address = address
    this.postalCode = postalCode
    this.city = city
    this.country = country
    this.user = user
  }
}
