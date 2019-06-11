/* eslint-disable no-unused-vars */

const { alarmtypeSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("alarmtypes", alarmtypeSchemaDescription)
    .then(() => logger.info("alarmtypes table created"))
    .catch(err => logger.error(`creating alarmtypes table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("alarmtypes")
    .then(() => logger.info("alarmtypes table deleted"))
    .catch(err => logger.error(`deleting alarmtypes table: ${err}`));
};
