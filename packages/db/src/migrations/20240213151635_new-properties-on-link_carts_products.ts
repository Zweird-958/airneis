import { Knex } from "knex"

export const up = async (db: Knex): Promise<void> => {
  await db.schema.alterTable("link_carts_products", (table) => {
    table.integer("quantity").notNullable()
  })
}

export const down = async (db: Knex): Promise<void> => {
  await db.schema.alterTable("link_carts_products", (table) => {
    table.dropColumn("quantity")
  })
}
