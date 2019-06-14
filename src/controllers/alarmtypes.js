/* eslint-disable no-unused-vars */
const conn = require("../config/conn");
const logger = require("../config/logger");

module.exports = {
  get(req, res, next) {
    conn
      .select("code", "name")
      .from("alarmtypes")
      .then(rows => {
        res.json(rows);
      })
      .catch(err => {
        logger.error(err);
        res.status(500).end();
      });
  },
  create(req, res, next) {
    if ("code" in req.body && "name" in req.body) {
      conn
        .insert({ code: req.body.code, name: req.body.name })
        .then(ids => {
          res.status(201).json({ message: `created ${ids}` });
        })
        .catch(err => {
          res.status(500).end();
        });
    } else {
      res.status(400).end();
    }
  },
  update(req, res, next) {
    // TODO: not really needed, remove
    if (req.query.code) {
      if ("name" in req.body) {
        alarmtypes
          .update({ code: req.query.code, name: req.body.name })
          .then(resp => {
            logger.debug(resp);
            res.send(resp);
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
  delete(req, res, next) {
    if ("code" in req.query) {
      alarmtypes
        .delete({ code: req.query.code })
        .then(resp => {
          logger.debug(resp);
          res.send(resp);
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
