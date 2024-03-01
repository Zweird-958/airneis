import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core"

import { Locale } from "@airneis/types"

import { BaseEntity } from "./BaseEntity"
import { Product } from "./Product"

@Entity({ tableName: "materials" })
export class Material extends BaseEntity {
  @Property({ type: "json", nullable: false, unique: true })
  name: { [key in Locale]: string }

  @ManyToMany({
    entity: () => Product,
    pivotTable: "link_materials_products",
    owner: true,
  })
  products = new Collection<Product>(this)

  constructor({ name }: { name: { [key in Locale]: string } }) {
    super()
    this.name = name
  }
}
