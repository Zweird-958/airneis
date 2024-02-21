import { Migrator } from "@mikro-orm/migrations"
import { defineConfig } from "@mikro-orm/postgresql"

import env from "./env.js"

export default defineConfig({
  host: "localhost",
  dbName: env.DATABASE_NAME,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  entities: ["../../build/packages/db/src/entities/*.js"],
  entitiesTs: ["src/entities/*.ts"],

  extensions: [Migrator],
  debug: process.env.NODE_ENV !== "production",
})
