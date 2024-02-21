import { Entity, Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity.js"

@Entity({ tableName: "images" })
export class Image extends BaseEntity {
  @Property({ type: "text", nullable: false })
  url: string

  constructor({ url }: { url: string }) {
    super()
    this.url = url
  }
}
