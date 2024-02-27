import { Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity"

export abstract class SoftBaseEntity<
  Entity extends object = object,
  Optional extends keyof Entity = never,
> extends BaseEntity<SoftBaseEntity & Entity, "deletedAt" | Optional> {
  @Property({ type: "timestamptz", default: null })
  deletedAt: Date | null = null
}
