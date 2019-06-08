const failuretypes = require("../dal/failuretypes");
const logger = require("../config/logger");

module.exports = {
  get(req, res) {
    failuretypes
      .get()
      .then(val => {
        logger.debug(val);
        res.status(200).send(val);
      })
      .catch(err => {
        logger.error(err);
        res.status(500).end();
      });
  },
  create(req, res) {
    if (req.query.name) {
      failuretypes
        .create({ name: req.query.name })
        .then(val => {
          logger.debug(val);
          res.status(200).send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res.status(422).json({ message: "Missing required 'name' field" });
    }
  },
  update(req, res) {
    if (req.query.id) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  delete(req, res) {
    if (true) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  }
};
