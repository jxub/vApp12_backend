const passport = require("passport");
const conn = require("./../config/conn");
const { userExists } = require("../controllers/users");

module.exports = {
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
        const role = {description: "de"};
        const account = {};
        const user = {};
        conn("roles").insert(role);
        conn("accounts").insert(account);
        conn("user").insert(user);

      } else {
      }
    }

    User.findOne({emailAddress: req.body.emailAddress})
         .then(user => {
             if(user){
                let error = 'Email Address Exists in Database.';
                return res.status(400).json(error);
             } else {
                const newUser = new User({
                      name: req.body.name,
                      emailAddress: req.body.emailAddress,
                      password: req.body.password
                 });
                 bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt,
                                        (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => res.json(user))
                           .catch(err => res.status(400).json(err));
                   });
               });
          }
     });
  }
};
