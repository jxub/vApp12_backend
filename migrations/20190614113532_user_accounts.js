/* eslint-disable no-unused-vars */

const logger = require("../src/config/logger");

exports.up = (knex, Promise) => {
  return knex
    .raw(
      `
    DROP VIEW IF EXISTS user_accounts;
    CREATE OR REPLACE VIEW user_accounts
    AS
      SELECT U.id, A.user_name, A.id, A.role_id, R.account_type
      FROM users as U
        LEFT JOIN accounts as A
        ON A.id = U.account_id
          LEFT JOIN roles as R
          ON R.id = A.role_id
  `
    )
    .then(() => logger.info("user_accounts view created"))
    .catch(err => logger.error(err));
};

exports.down = (knex, Promise) => {
  return knex
    .raw(
      `
    DROP VIEW user_accounts;
    `
    )
    .then(() => logger.info("user_accounts view deleted"))
    .catch(err => logger.error(err));
};

// select usr.idusers, usr.idprojects, acc.username, acc.idaccounts, acc.idroles, rol.accounttype from consulgal.users as usr
// left join consulgal.accounts as acc on acc.idaccounts = usr.idaccounts left join consulgal.roles as rol on rol.idroles = acc.idroles
