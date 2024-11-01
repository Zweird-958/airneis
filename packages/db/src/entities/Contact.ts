import { Entity, Property } from "@mikro-orm/core"

import { BaseEntity } from "./BaseEntity"

@Entity({ tableName: "contacts" })
export class Contact extends BaseEntity {
  @Property({ type: "text", nullable: false })
  email: string

  @Property({ type: "text", nullable: false })
  subject: string

  @Property({ type: "text", nullable: false })
  description: string

  constructor({
    email,
    subject,
    description,
  }: {
    email: string
    subject: string
    description: string
  }) {
    super()
    this.email = email
    this.subject = subject
    this.description = description
  }
}
