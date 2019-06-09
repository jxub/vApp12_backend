const knex = require("knex");

module.exports = knex({
  client: "sqlite3",
  connection: {
    filename: "./vapp12.sqlite"
  }
});
