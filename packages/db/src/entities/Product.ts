import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from "@mikro-orm/core"

import { Locale } from "@airneis/types/Locale"

import { Category } from "./Category.js"
import { Image } from "./Image.js"
import { Material } from "./Material.js"
import { OrderProduct } from "./OrderProduct.js"
import { SoftBaseEntity } from "./SoftBaseEntity.js"

@Entity({ tableName: "products" })
export class Product extends SoftBaseEntity {
  @Property({ type: "json", nullable: false })
  name: { [key in Locale]: string }

  @Property({ type: "json", nullable: false })
  description: { [key in Locale]: string }

  @Property({ type: "integer", nullable: false })
  stock: number

  @Property({ type: "integer", nullable: false })
  price: number

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
  }: {
    name: { [key in Locale]: string }
    description: { [key in Locale]: string }
    stock: number
    price: number
  }) {
    super()
    this.name = name
    this.description = description
    this.stock = stock
    this.price = price
  }
}