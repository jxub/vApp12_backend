/* eslint-disable no-unused-vars */

const { slumpSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("slumps", slumpSchemaDescription)
    .then(() => logger.info("slumps table created"))
    .catch(err => logger.error(`creating slumps table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("slumps")
    .then(() => logger.info("slumps table deleted"))
    .catch(err => logger.error(`deleting slumps table: ${err}`));
};
