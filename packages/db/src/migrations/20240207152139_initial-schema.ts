import { Knex } from "knex"

// eslint-disable-next-line max-lines-per-function
export const up = async (db: Knex): Promise<void> => {
  await db.schema.createTable("messages", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("email").notNullable()
    table.text("subject").notNullable()
    table.text("description").notNullable()
  })

  await db.schema.createTable("users", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable()
    table.text("password").notNullable()
  })

  await db.schema.createTable("delivery_countries", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("name").unique().notNullable()
    table.float("vat").notNullable()
  })

  await db.schema.createTable("addresses", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("fullName").notNullable()
    table.text("address").notNullable()
    table.text("postalCode").notNullable()
    table.text("city").notNullable()
    // J'estime que ce n'est pas indispensable de le fournir mais c'est toujours bien s'il le fait
    table.text("phoneNumber")
    table.boolean("isFavorite").defaultTo(false)
    table
      .uuid("countryId")
      .notNullable()
      .references("id")
      .inTable("delivery_countries")
    table.uuid("userId").notNullable().references("id").inTable("users")
  })

  await db.schema.createTable("orders", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.enum("status", ["ANNULÉE", "LIVRÉE", "EN COURS"]).notNullable()
    table.double("total").notNullable()
    table.float("vat").notNullable()
    table.integer("quantity").notNullable()
    table
      .uuid("deliveryAddressId")
      .notNullable()
      .references("id")
      .inTable("addresses")
    table
      .uuid("billingAddressId")
      .notNullable()
      .references("id")
      .inTable("addresses")
    table.uuid("userId").notNullable().references("id").inTable("users")
  })

  await db.schema.createTable("carts", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    // Doit-on conserver ce champ unique puisque techniquement un utilisateur ne peut avoir qu'un seul panier ?
    table
      .uuid("userId")
      .unique()
      .notNullable()
      .references("id")
      .inTable("users")
  })

  await db.schema.createTable("images", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("url").unique().notNullable()
  })

  await db.schema.createTable("categories", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("name").unique().notNullable()
    table.text("description").notNullable()
    table.uuid("imageId").notNullable().references("id").inTable("images")
  })

  await db.schema.createTable("materials", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    table.text("name").unique().notNullable()
  })

  await db.schema.createTable("products", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(db.fn.uuid())
    table.timestamps(true, true, true)
    // Doit-on garder la contraite unique pour un nom de produit ?
    table.text("name").unique().notNullable()
    table.text("description").notNullable()
    table.integer("stock").notNullable()
    table.double("price").notNullable()
  })

  await db.schema.createTable("link_materials_products", (table) => {
    table.uuid("materialId").notNullable().references("id").inTable("materials")
    table.uuid("productId").notNullable().references("id").inTable("products")
  })

  await db.schema.createTable("link_categories_products", (table) => {
    table
      .uuid("categoryId")
      .notNullable()
      .references("id")
      .inTable("categories")
    table.uuid("productId").notNullable().references("id").inTable("products")
  })

  await db.schema.createTable("link_images_products", (table) => {
    table.uuid("imageId").notNullable().references("id").inTable("images")
    table.uuid("productId").notNullable().references("id").inTable("products")
  })

  await db.schema.createTable("link_orders_products", (table) => {
    table.uuid("orderId").notNullable().references("id").inTable("orders")
    table.uuid("productId").notNullable().references("id").inTable("products")
  })

  await db.schema.createTable("link_carts_products", (table) => {
    table.uuid("cartId").notNullable().references("id").inTable("carts")
    table.uuid("productId").notNullable().references("id").inTable("products")
  })
}

export const down = async (db: Knex): Promise<void> => {
  await db.schema.dropTable("link_carts_products")
  await db.schema.dropTable("link_orders_products")
  await db.schema.dropTable("link_images_products")
  await db.schema.dropTable("link_categories_products")
  await db.schema.dropTable("link_materials_products")
  await db.schema.dropTable("products")
  await db.schema.dropTable("materials")
  await db.schema.dropTable("categories")
  await db.schema.dropTable("images")
  await db.schema.dropTable("carts")
  await db.schema.dropTable("orders")
  await db.schema.dropTable("addresses")
  await db.schema.dropTable("delivery_countries")
  await db.schema.dropTable("users")
  await db.schema.dropTable("messages")
}
