import { PrimaryKey, Property } from "@mikro-orm/core"
import { uuid } from "uuidv4"

export abstract class BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id = uuid()

  @Property({ defaultRaw: "now()" })
  createdAt = new Date()

  @Property({ onUpdate: () => new Date(), defaultRaw: "now()" })
  updatedAt = new Date()
}
