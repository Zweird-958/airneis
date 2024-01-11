/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
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
