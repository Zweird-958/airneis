import { Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity.js"

export abstract class SoftBaseEntity extends BaseEntity {
  @Property({ type: "timestamptz", defaultRaw: "null" })
  deletedAt: Date | null = null
}
