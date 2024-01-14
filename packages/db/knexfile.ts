import { Knex } from "knex"
import { config as dotenv } from "dotenv"

dotenv({ path: "../../.env" })

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: "./src/migrations",
    loadExtensions: [".ts"],
  },
  seeds: {
    directory: "./src/seeds",
    loadExtensions: [".ts"],
  },
}

export default config
