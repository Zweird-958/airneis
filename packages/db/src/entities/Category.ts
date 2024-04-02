import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core"

import { Locale } from "@airneis/types"

import { BaseEntity } from "./BaseEntity"
import { Image } from "./Image"
import { Product } from "./Product"

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

  @Property({ type: "text", nullable: false, unique: true })
  slug: string

  constructor({
    name,
    description,
    image,
    slug,
  }: {
    name: { [key in Locale]: string }
    description: { [key in Locale]: string }
    image: Image
    slug: string
  }) {
    super()
    this.name = name
    this.description = description
    this.image = image
    this.slug = slug
  }
}
