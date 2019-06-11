/* eslint-disable no-unused-vars */

const { equipmentSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("equipments", equipmentSchemaDescription)
    .then(() => logger.info("equipments table created"))
    .catch(err => logger.error(`creating equipments table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("equipments")
    .then(() => logger.info("equipments table deleted"))
    .catch(err => logger.error(`deleting equipments table: ${err}`));
};
