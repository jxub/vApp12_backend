/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const conn = require("../config/conn");
const logger = require("../config/logger");
const utils = require("../persistence/utils");

// mail name role company
// mail company -> users table
// company -> accounts table
// role -> roles table, description field

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create(req, res, next) {
    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "User added successfully!!!",
            data: null
          });
      }
    );
  },
  authenticate(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "user found!!!",
            data: { user: userInfo, token: token }
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid email/password!!!",
            data: null
          });
        }
      }
    });
  }
};

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
          logger.error(err.message);
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
          logger.error(err.message);
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
      let userExists;
      utils
        .userExists(req.body.mail)
        .then(exists => {
          userExists = exists;
        })
        .catch(e => {
          logger.error(e);
          res.status(500).end();
        });
      if (userExists) {
        res.status(400).json({ message: "user already exists" });
      } else {
        let defaultRoleId;
        const defaultDescription = "default-0";
        conn
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
        utils
          .createAuth(req.body.password)
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
    if (
      "mail" in req.query &&
      "mail" in req.body &&
      "name" in req.body &&
      "role" in req.body &&
      "company" in req.body
    ) {
      if (req.query.mail !== req.body.mail) {
        res.status(400).json({ message: "mail values are different" });
        return;
      }

      utils
        .getUser(req.query.mail, conn)
        .then(u0 => {
          conn("users")
            .where("id", u0.id)
            .update({
              mail: req.body.mail,
              company: req.body.company
            })
            .then(u1 => {
              conn
                .select("role_id")
                .from("accounts")
                .where("id", u0.account_id);
            })
            .then(rows => {
              const roleId = rows[0].role_id;
              conn("roles")
                .where("id", roleId)
                .update({});
            });
        })
        .catch(err => {
          logger.error(err.message);
          res.status(500).end();
        });
    }
  },
  // deletes the user and it's account
  delete(req, res, next) {
    if (req.query.mail) {
      let user;
      utils
        .getUser(req.query.mail, conn)
        .then(u => {
          user = u;
        })
        .catch(e => {
          logger.error(e.message);
          res.status(500).end();
        });
      const [uid, accountId] = [user.id, user.account_id];
      conn("users")
        .where("id", uid)
        .del()
        .then(v0 => {
          logger.debug(v0);
          conn("accounts")
            .where("id", accountId)
            .del()
            .then(v1 => {
              logger.debug(v1);
              res.status(200).json({ message: "deleted user and account" });
            })
            .catch(e => {
              logger.error(e.message);
              res.status(500).end();
            });
        })
        .catch(e => {
          logger.error(e.message);
          res.status(500).end();
        });
    } else {
      res.status(422).json({ message: "Missing required param mail" });
    }
  }
};
