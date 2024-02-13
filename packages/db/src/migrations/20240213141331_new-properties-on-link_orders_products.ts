import { Knex } from "knex"

export const up = async (db: Knex): Promise<void> => {
  await db.schema.alterTable("orders", (table) => {
    table.dropColumn("quantity")
  })

  await db.schema.alterTable("link_orders_products", (table) => {
    table.integer("quantity").notNullable()
    table.double("priceUnit").notNullable()
  })
}

export const down = async (db: Knex): Promise<void> => {
  await db.schema.alterTable("link_orders_products", (table) => {
    table.dropColumn("quantity")
    table.dropColumn("priceUnit")
  })

  await db.schema.alterTable("orders", (table) => {
    table.integer("quantity").notNullable()
  })
}
