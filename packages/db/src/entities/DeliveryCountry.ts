import { Entity, Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity.js"

@Entity({ tableName: "delivery_countries" })
export class DeliveryCountry extends BaseEntity {
  @Property({ type: "text", nullable: false, unique: true })
  name: string

  @Property({ type: "float", nullable: false })
  vat: number

  constructor({ name, vat }: { name: string; vat: number }) {
    super()
    this.name = name
    this.vat = vat
  }
}
