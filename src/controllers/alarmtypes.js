const alarmtypes = require("../dal/alarmtypes");
const logger = require("./../logger");

module.exports = {
  // eslint-disable-next-line no-unused-vars
  get(req, res) {
    alarmtypes
      .get({ code: req.query.code })
      .then(resp => {
        logger.debug(resp);
        res.status(200).send(resp);
      })
      .catch(err => {
        logger.error(err);
        res.status(500).end();
      });
  },
  create(req, res) {
    if ("code" in req.body && "name" in req.body) {
      alarmtypes
        .create({ code: req.body.code, name: req.body.name })
        .then(resp => {
          logger.debug(resp);
          res.status(200).send(resp);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    }
  },
  update(req, res) {
    // TODO: not really needed, remove
    if (req.query.code) {
      if ("name" in req.body) {
        alarmtypes
          .update({ code: req.query.code, name: req.body.name })
          .then(resp => {
            logger.debug(resp);
            res.status(200).send(resp);
          })
          .catch(err => {
            logger.error(err);
            res.status(500).end();
          });
      } else {
        res.status(400).end();
      }
    } else {
      res.status(400).end();
    }
  },
  delete(req, res) {
    if ("code" in req.query) {
      alarmtypes
        .delete({ code: req.query.code })
        .then(resp => {
          logger.debug(resp);
          res.status(200).send(resp);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  }
};
