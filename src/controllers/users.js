/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const conn = require("../config/conn");
const logger = require("../config/logger");

module.exports = {
  get(req, res, next) {
    if ("mail" in req.query) {
      // getUser
      conn
        .raw(
          `
      SELECT U.name, U.mail, U.company, R.description
      FROM users as U
        LEFT JOIN accounts as A
        ON U.account_id = A.id
          LEFT JOIN roles as R
          ON A.role_id = R.id
          LIMIT 1
      `
        )
        .then(users => {
          const u0 = users[0];
          const u = {
            name: u0.name,
            mail: u0.mail,
            company: u0.company,
            role: u0.description
          };
          res.json(u);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).json({ message: err });
        });
    } else {
      // getUsers
      conn("users")
        .select("*")
        .then(rows => {
          const users = [];
          for (let i = 0; i < rows.length; i += 1) {
            const u = rows[i];
            users.push({
              name: u.name,
              mail: u.mail,
              company: u.company,
              role: u.description
            });
          }
          res.json(users);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).json({ message: err });
        });
    }
  },
  create(req, res, next) {
    if (
      "mail" in req.body &&
      "name" in req.body &&
      "role" in req.body &&
      "company" in req.body
    ) {
      // createUser
      conn("")
      conn("users")
      .insert({
        name: req.body.name,
        mail: req.body.mail,
        
      })
    }
  },
  update(req, res, next) {
    if (req) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  delete(req, res, next) {
    if (req.query.id) {
      dal.users.deleteById(req.query.id, function(err, answer) {
        if (!err) {
          res.send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else {
      res.status(422).json({ message: "Missing required field" });
    }
  }
};
