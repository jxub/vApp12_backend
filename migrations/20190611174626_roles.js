/* eslint-disable no-unused-vars */

const { roleSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("roles", roleSchemaDescription)
    .then(() => logger.info("roles table created"))
    .catch(err => logger.error(`creating roles table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("roles")
    .then(() => logger.info("roles table deleted"))
    .catch(err => logger.error(`deleting roles table: ${err}`));
};
