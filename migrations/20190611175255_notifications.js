/* eslint-disable no-unused-vars */

const { notificationSchemaDescription } = require("../src/dal/schema");
const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex.schema
    .createTable("notifications", notificationSchemaDescription)
    .then(() => logger.info("notifications table created"))
    .catch(err => logger.error(`creating notifications table: ${err}`));
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable("notifications")
    .then(() => logger.info("notifications table deleted"))
    .catch(err => logger.error(`deleting notifications table: ${err}`));
};
