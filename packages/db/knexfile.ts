import { config as dotenv } from "dotenv"
import { Knex } from "knex"

dotenv({ path: "../../.env" })

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./src/migrations",
    loadExtensions: [".ts"],
    stub: "./src/migration.stub",
  },
  seeds: {
    directory: "./src/seeds",
    loadExtensions: [".ts"],
  },
}

export default config
