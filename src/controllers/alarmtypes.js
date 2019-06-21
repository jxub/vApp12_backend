/* eslint-disable no-unused-vars */
const conn = require("../config/conn");
const logger = require("../config/logger");

module.exports = {
  get(req, res, next) {
    // getAlarmTypes
    conn
      .select("code", "name")
      .from("alarmtypes")
      .then(rows => {
        res.json(rows);
      })
      .catch(err => {
        logger.error(err.message);
        res.status(500).end();
      });
  },
  create(req, res, next) {
    if ("code" in req.body && "name" in req.body) {
      // createAlarmType
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
    if ("code" in req.query && "name" in req.body) {
      // editAlarmType
      conn("alarmtypes")
        .where("code", req.query.code)
        .update({ name: req.body.name }, ["code", "name"])
        .then(rows => {
          res.status(200).json({ message: `updated ${rows}` });
        })
        .catch(err => {
          logger.error(err.message);
          res.status(500).json({ message: `${err}` });
        });
    } else {
      res.status(400).end();
    }
  },
  delete(req, res, next) {
    // deleteAlarmType
    if ("code" in req.query) {
      conn("alarmtypes")
        .where("code", req.query.code)
        .del()
        .then(deleted => {
          res.status(200).json({ message: `deleted: ${deleted} row/s` });
        })
        .catch(err => {
          logger.error(err.message);
          res.status(500).json({ message: `${err}` });
        });
    } else {
      res.status(400).end();
    }
  }
};
