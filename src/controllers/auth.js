const passport = require("passport");
const dal = require("../DAL");

module.exports = {
  register(req, res) {
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
  login(req, res, next) {
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
        res.status(200).send({ token: dal.accounts.generateJwt(user) });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res, next);
  }
};
