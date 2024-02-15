import { Entity, Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity.js"

@Entity()
export class User extends BaseEntity {
  @Property()
  fullName!: string

  @Property()
  email!: string

  @Property()
  password!: string

  @Property({ type: "text" })
  bio = ""

  @Property({ type: "date" })
  birthdate?: Date
}
