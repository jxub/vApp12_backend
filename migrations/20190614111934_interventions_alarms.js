/* eslint-disable no-unused-vars */

const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex
    .raw(
      `
    DROP VIEW IF EXISTS interventions_alarms;
    CREATE OR REPLACE VIEW interventions_alarms
    AS
      SELECT *
      FROM interventions as I
        INNER JOIN alarms as A
        ON I.alarm_id = A.id;
  `
    )
    .then(() => logger.info("interventions_alarms view created"))
    .catch(err => logger.error(err.message));
};

exports.down = (knex, Promise) => {
  return knex
    .raw(
      `
    DROP VIEW interventions_alarms;
    `
    )
    .then(() => logger.info("interventions_alarms view deleted"))
    .catch(err => logger.error(err.message));
};

// select * from failuremanager.interventions as itv inner join failuremanager.alarms as alm on itv.idAlarm = alm.id
