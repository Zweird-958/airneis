import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity.js"
import { Category } from "./Category.js"

@Entity()
export class Product extends BaseEntity {
  @Property()
  name!: string

  @Property()
  description!: string

  @Property()
  stock!: number

  @Property()
  price!: number

  @ManyToMany(() => Category, (c) => c.products)
  categories = new Collection<Category>(this)
}
