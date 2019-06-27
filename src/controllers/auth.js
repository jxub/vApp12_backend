const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const conn = require("./../config/conn");
const utils = require("./../persistence/utils");
const logger = require("./../config/logger");
const { userExists } = require("../controllers/users");

// TODO

module.exports = {
  register(req, res, next) {
    let roleId;
    conn
      .select("id")
      .from("roles")
      .where("description", "default-0")
      .limit(1)
      .then(rows => {
        roleId = rows[0].id;
      })
      .catch(err => logger.error(err));

    let userHash;
    let userSalt;
    let bcryptErr;
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
      role_id: roleId
    });

    let accountId;
    conn
      .select("id")
      .from("accounts")
      .where("user_name", req.body.name)
      .then(rows => {
        accountId = rows[0].id;
      });

    conn("users")
      .insert({
        mail: req.body.mail,
        company: req.body.company,
        account_id: accountId
      })
      .then(() => {
        res.json({
          status: "success",
          message: "User added successfully!!!",
          data: null
        });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).json({
          status: "error",
          message: "User not added",
          data: null
        });
      });
  },
  login(req, res, next) {
    let accountId;
    conn
      .select("*")
      .from("users")
      .where("mail", req.body.mail)
      .limit(1)
      .then(rows => {
        accountId = rows[0].id;
      })
      .catch(err => {

      });
    conn
      .
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

const foo = {
  registerV1(req, res, next) {
    if (req.body.username && req.body.password) {
      dal.accounts.create(req.body.username, req.body.password, function(
        e,
        answer
      ) {
        if (!e) {
          res.status(201).json({ message: answer });
        } else {
          res.status(500).json({ message: answer });
        }
      });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  loginV1(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      // let token;
      console.log("passport authentication");
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // If a user is found
      if (user) {
        console.log("Creating jw token...");
        console.log("out user: ");
        console.log(user);
        res.send({ token: dal.accounts.generateJwt(user) });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res, next);
  },
  register(req, res, next) {
    if ("username" in req.body && "password" in req.body) {
      if (!userExists({ user: req.body.username, pass: req.body.password })) {
        const role = { description: "de" };
        const account = {};
        const user = {};
        conn("roles").insert(role);
        conn("accounts").insert(account);
        conn("user").insert(user);
      } else {
      }
    }

    User.findOne({ emailAddress: req.body.emailAddress }).then(user => {
      if (user) {
        let error = "Email Address Exists in Database.";
        return res.status(400).json(error);
      } else {
        const newUser = new User({
          name: req.body.name,
          emailAddress: req.body.emailAddress,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => res.status(400).json(err));
          });
        });
      }
    });
  }
};
