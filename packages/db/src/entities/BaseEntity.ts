import { PrimaryKey, Property } from "@mikro-orm/core"
import { uuid } from "uuidv4"

export abstract class BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id = uuid()

  @Property({ type: "timestamptz", defaultRaw: "now()" })
  createdAt = new Date()

  @Property({
    type: "timestamptz",
    defaultRaw: "now()",
    onUpdate: () => new Date(),
  })
  updatedAt = new Date()
}
