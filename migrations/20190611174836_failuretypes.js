/* eslint-disable no-unused-vars */

const { failuretypeSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("failuretypes", failuretypeSchemaDescription)
    .then(() => logger.info("failuretypes table created"))
    .catch(err => logger.error(`creating failuretypes table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("failuretypes")
    .then(() => logger.info("failuretypes table deleted"))
    .catch(err => logger.error(`deleting failuretypes table: ${err}`));
};
