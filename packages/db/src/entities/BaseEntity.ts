import { Opt, PrimaryKey, Property } from "@mikro-orm/core"
import { randomUUID } from "crypto"

export abstract class BaseEntity {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id: string & Opt = randomUUID()

  @Property({ type: "timestamptz", defaultRaw: "now()" })
  createdAt: Date & Opt = new Date()

  @Property({
    type: "timestamptz",
    defaultRaw: "now()",
    onUpdate: () => new Date(),
  })
  updatedAt: Date & Opt = new Date()
}
