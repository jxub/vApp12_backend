/* eslint-disable func-names */
/* eslint-disable no-console */
/* made by David Aleixo @ KBZ david.aleixo@knowledgebiz.pt */

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const accounts = require("./../dal/accounts");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      console.log("using passport...");
      accounts.getbyUserName(username, function(e, user) {
        if (e) {
          return done(e);
        }
        if (!user) {
          return done(null, false, { message: "Account not found" });
        }
        if (!accounts.validPassword(user, password)) {
          return done(null, false, { message: "Password is wrong" });
        }
        // do not return the hash and salt
        return done(null, {
          id: user.idaccounts,
          username: user.username,
          idroles: user.idroles
        });
      });
    }
  )
);
