/* eslint-disable no-unused-vars */

const { accountSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("accounts", accountSchemaDescription)
    .then(() => logger.info("accounts table created"))
    .catch(err => logger.error(`creating accounts table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("accounts")
    .then(() => logger.info("accounts table deleted"))
    .catch(err => logger.error(`deleting accounts table: ${err}`));
};
