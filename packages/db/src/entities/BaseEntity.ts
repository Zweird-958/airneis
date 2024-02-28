import { OptionalProps, PrimaryKey, Property } from "@mikro-orm/core"
import { randomUUID } from "crypto"

export abstract class BaseEntity<
  Entity extends object = object,
  Optional extends keyof Entity = never,
> {
  [OptionalProps]?: "id" | "createdAt" | "updatedAt" | Optional

  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id = randomUUID()

  @Property({ type: "timestamptz", defaultRaw: "now()" })
  createdAt = new Date()

  @Property({
    type: "timestamptz",
    defaultRaw: "now()",
    onUpdate: () => new Date(),
  })
  updatedAt = new Date()
}
