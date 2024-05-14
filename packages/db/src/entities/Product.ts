import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from "@mikro-orm/core"

import { Locale } from "@airneis/types"

import { Category } from "./Category"
import { Image } from "./Image"
import { Material } from "./Material"
import { OrderProduct } from "./OrderProduct"
import { SoftBaseEntity } from "./SoftBaseEntity"

@Entity({ tableName: "products" })
export class Product extends SoftBaseEntity<Product, "priority"> {
  @Property({ type: "json", nullable: false })
  name: { [key in Locale]: string }

  @Property({ type: "json", nullable: false })
  description: { [key in Locale]: string }

  @Property({ type: "integer", nullable: false })
  stock: number

  @Property({ type: "integer", nullable: false })
  price: number

  @Property({ type: "text", nullable: false, unique: true })
  slug: string

  @Property({ type: "integer", nullable: true, default: null })
  priority: number | null = null

  @ManyToMany({
    entity: () => Category,
    mappedBy: (category) => category.products,
  })
  categories = new Collection<Category>(this)

  @ManyToMany({
    entity: () => Material,
    mappedBy: (material) => material.products,
  })
  materials = new Collection<Material>(this)

  @ManyToMany({ entity: () => Image, pivotTable: "link_images_products" })
  images = new Collection<Image>(this)

  @OneToMany({
    entity: () => OrderProduct,
    mappedBy: (orderProduct) => orderProduct.product,
    orphanRemoval: true,
  })
  orderItems = new Collection<OrderProduct>(this)

  constructor({
    name,
    description,
    stock,
    price,
    slug,
  }: {
    name: { [key in Locale]: string }
    description: { [key in Locale]: string }
    stock: number
    price: number
    slug: string
  }) {
    super()
    this.name = name
    this.description = description
    this.stock = stock
    this.price = price
    this.slug = slug
  }
}
