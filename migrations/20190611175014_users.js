/* eslint-disable no-unused-vars */

const { userSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("users", userSchemaDescription)
    .then(() => logger.info("users table created"))
    .catch(err => logger.error(`creating users table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("users")
    .then(() => logger.info("users table deleted"))
    .catch(err => logger.error(`deleting users table: ${err}`));
};
