/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const bcrypt = require("bcrypt");
const conn = require("../config/conn");
const logger = require("../config/logger");

const SALT_ROUNDS = 10;
const userExists = async (mail, connection = conn) => {
  const u = await conn
    .select("*")
    .from("users")
    .where("mail", mail);

  if (u.length > 0) {
    return true;
  }

  return false;
};
const createAuth = async password => {
  let [salt, hash, err] = [null, null, null];
  try {
    salt = await bcrypt.genSalt(SALT_ROUNDS);
    hash = await bcrypt.hash(password, salt);
  } catch (e) {
    err = e.message;
  }
  return [salt, hash, err];
};

// const conn = require("./src/config/conn")
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
      "company" in req.body &&
      "password" in req.body // TODO: accept password from the frontend
    ) {
      let roleNotFoundErr;
      let bcryptErr;
      if (userExists(req.body.mail)) {
        res.status(400).json({ message: "user already exists" });
      } else {
        let defaultRoleId;
        const defaultDescription = "default-0";
        conn("roles")
          .select("id")
          .from("roles")
          .where("description", defaultDescription)
          .limit(1)
          .then(rows => {
            defaultRoleId = rows[0].id;
          })
          .catch(err => {
            logger.error(err.message);
            roleNotFoundErr = err.message;
          });

        if (roleNotFoundErr) {
          res.status(500).json({ message: "default role not found" });
          return;
        }

        let userHash;
        let userSalt;
        createAuth(req.body.password)
          .then(([hash, salt, err]) => {
            [userHash, userSalt, bcryptErr] = [hash, salt, err];
          })
          .catch(e => {
            [userHash, userSalt, bcryptErr] = [null, null, e.message];
          });

        if (bcryptErr) {
          res.status(500).json({ message: "error creating password" });
          return;
        }
        conn("accounts").insert({
          user_name: req.body.name,
          user_hash: userHash,
          user_salt: userSalt,
          role_id: defaultRoleId
        });

        let accountId;
        conn
          .select("id")
          .from("accounts")
          .where("user_name", req.body.name)
          .then(rows => {
            accountId = rows[0].id;
          });

        conn("users").insert({
          mail: req.body.mail,
          company: req.body.company,
          account_id: accountId
        });
      }
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
