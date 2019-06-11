/* eslint-disable no-unused-vars */

const { projectSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("projects", projectSchemaDescription)
    .then(() => logger.info("projects table created"))
    .catch(err => logger.error(`creating projects table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("projects")
    .then(() => logger.info("projects table deleted"))
    .catch(err => logger.error(`deleting projects table: ${err}`));
};
