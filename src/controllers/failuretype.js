const failuretypes = require("../dal/failuretypes");
const logger = require("../config/logger");
// from id, name, code return only id and name
// to the caller
module.exports = {
  get(req, res, next) {
    failuretypes
      .get()
      .then(val => {
        logger.debug(val);
        res.send(val);
      })
      .catch(err => {
        logger.error(err);
        res.status(500).end();
      });
  },
  create(req, res, next) {
    if (req.query.name) {
      failuretypes
        .create({ name: req.query.name })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res.status(422).json({ message: "Missing required 'name' field" });
    }
  },
  update(req, res, next) {
    if (req.query.id) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  delete(req, res, next) {
    if (true) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  }
};
