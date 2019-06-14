/* eslint-disable no-unused-vars */

const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex
    .raw(
      `
    CREATE VIEW user_projects
    AS
      SELECT P.name, P.description, P.status, P.threshold, P.id, U.id
      FROM projects as P
        LEFT JOIN users as U
        ON P.id = U.project_id;
  `
    )
    .then(() => logger.info("user_projects view created"))
    .catch(err => logger.error(err));
};

exports.down = (knex, Promise) => {
  return knex
    .raw(
      `
    DROP VIEW user_projects;
    `
    )
    .then(() => logger.info("user_projects view deleted"))
    .catch(err => logger.error(err));
};

// select proj.name, proj.description, proj.status,
// proj.threshold, proj.idprojects, usr.idaccounts
// from consulgal.projects as proj left join
// consulgal.users as usr on proj.idprojects = usr.idprojects;
