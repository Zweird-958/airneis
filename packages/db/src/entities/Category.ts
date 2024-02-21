import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core"

import { Locale } from "@airneis/types/Locale"

import { BaseEntity } from "./BaseEntity.js"
import { Image } from "./Image.js"
import { Product } from "./Product.js"

@Entity({ tableName: "categories" })
export class Category extends BaseEntity {
  @Property({ type: "json", nullable: false, unique: true })
  name: { [key in Locale]: string }

  @Property({ type: "json", nullable: false })
  description: { [key in Locale]: string }

  @ManyToOne({ entity: () => Image })
  image: Image

  @ManyToMany({
    entity: () => Product,
    pivotTable: "link_categories_products",
    owner: true,
  })
  products = new Collection<Product>(this)

  constructor({
    name,
    description,
    image,
  }: {
    name: { [key in Locale]: string }
    description: { [key in Locale]: string }
    image: Image
  }) {
    super()
    this.name = name
    this.description = description
    this.image = image
  }
}
