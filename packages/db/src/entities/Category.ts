import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity.js"
import { Product } from "./Product.js"

@Entity()
export class Category extends BaseEntity {
  @Property()
  name!: string

  @Property({})
  description!: string

  @ManyToMany({ entity: () => Product, owner: true })
  products = new Collection<Product>(this)
}
