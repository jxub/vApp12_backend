/* eslint-disable no-unused-vars */

const { machineSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("machines", machineSchemaDescription)
    .then(() => logger.info("machines table created"))
    .catch(err => logger.error(`creating machines table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("machines")
    .then(() => logger.info("machines table deleted"))
    .catch(err => logger.error(`deleting machines table: ${err}`));
};
