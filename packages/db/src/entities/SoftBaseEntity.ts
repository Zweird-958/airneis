import { Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity"

export abstract class SoftBaseEntity extends BaseEntity {
  @Property({ type: "timestamptz", default: null })
  deletedAt: Date | null = null
}
