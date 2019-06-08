/** made by david.aleixo@knowledgebiz.pt */

const request = require("request");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config/config.json");
const storage = require("./storage");

const _genSalt = function(password) {
  return crypto.randomBytes(16).toString("hex");
};
const _genHash = function(salt, password) {
  return crypto.pbkdf2Sync(password, salt, 1000, 16, "sha512").toString("hex");
};

const _genJwt = function(user) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  let idAccounts;
  if (user.id) {
    idAccounts = user.id;
  } else {
    idAccounts = 0;
  }
  return jwt.sign(
    {
      id: idAccounts,
      username: user.username,
      role: user.idroles,
      exp: parseInt(expiry.getTime() / 1000)
    },
    config.jwt.secret
  );
};

module.exports = {
  generateJwt(user) {
    console.log("Generating token");
    return _genJwt(user);
  },
  validPassword(user, password) {
    console.log("Validating password...");
    return (
      user.userhash ===
      crypto
        .pbkdf2Sync(password, user.usersalt, 1000, 16, "sha512")
        .toString("hex")
    );
  },
  create(user, password, cb) {
    storage(
      "GET",
      "/tables/accounts/rows?filter=username='" + user + "'",
      {},
      function(err, response, body) {
        if (err) {
          cb(true, "Relational Storage Component not responding");
        } else if (response.statusCode == 200) {
                    json = JSON.parse(response.body);
                    result = json.list_of_rows
                    if (result.length > 0) {
                        cb(false, "Email already Exists");
                    } else {
                        //Auth
                        //Possible idRoles 
                        //1 - Contractor
                        //2 - Admin (default)
                        //3 - Provider
                        let thisSalt = _genSalt(password);
                        let newuser = [{
                            userName: user,
                            userHash: _genHash(thisSalt, password),
                            userSalt: thisSalt,
                            idRoles: 2
                        }]

                        storage('POST', '/tables/accounts/rows', newuser, function (error, response, body) {
                            if (!error) {
                                if (response.statusCode == 201) {
                                    //Generate jwt
                                    cb(false, _genJwt({ username: user, idroles: 2 }))
                                } else {
                                    json = JSON.parse(response.body);
                                    cb(false, json.message);
                                }
                            } else {
                                cb(true, "Relational Storage Component not responding");
                            }
                        })
                    }
                }else{
                    cb(false, JSON.parse(response.body).message)
                }
      }
    );
  },
  getbyUserName(username, cb) {
    storage(
      "GET",
      "/tables/accounts/rows?filter=userName=" + "'" + username + "'",
      {},
      function(error, response, body) {
        if (!error) {
          if (response.statusCode == 200) {
            json = JSON.parse(response.body);
            cb(false, json.list_of_rows[0]);
          } else {
            json = JSON.parse(response.body);
            cb(false, json.message);
          }
        } else {
          cb(true, "Relational Storage Component not responding");
        }
      }
    );
  },
  getFiltered(id, cb) {
    storage(
      "GET",
      "/tables/accounts/rows?query_columns_specification=idaccounts, username, idroles&filter=idaccounts!=" +
        "'" +
        id +
        "'",
      {},
      function(error, response, body) {
        if (!error) {
          if (response.statusCode == 200) {
            console.log("AQUI");
            cb(false, JSON.parse(response.body).list_of_rows);
          } else {
            cb(false, JSON.parse(response.body).message);
          }
        } else {
          cb(true, "Relational Storage Component not responding");
        }
      }
    );
  }
};
