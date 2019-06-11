/* eslint-disable no-unused-vars */

const { interventionSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("interventions", interventionSchemaDescription)
    .then(() => logger.info("interventions table created"))
    .catch(err => logger.error(`creating interventions table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("interventions")
    .then(() => logger.info("interventions table deleted"))
    .catch(err => logger.error(`deleting interventions table: ${err}`));
};
