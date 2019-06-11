/* eslint-disable no-unused-vars */

const { alarmSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("alarms", alarmSchemaDescription)
    .then(() => logger.info("alarms table created"))
    .catch(err => logger.error(`creating alarms table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("alarms")
    .then(() => logger.info("alarms table deleted"))
    .catch(err => logger.error(`deleting alarms table: ${err}`));
};
