/* eslint-disable no-unused-vars */
const conn = require("../config/conn");
const logger = require("../config/logger");

module.exports = {
  get(req, res, next) {
    // getFailureTypes
    conn
      .select("id", "name")
      .from("failuretypes")
      .then(rows => {
        res.json(rows);
      })
      .catch(err => {
        logger.error(err.message);
        res.status(500).end();
      });
  },
  create(req, res, next) {
    if ("name" in req.body) {
      // createFailureType
      conn
        .insert({ name: req.body.name })
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
    if ("id" in req.query && "name" in req.body) {
      // editFailureType
      conn("failuretypes")
        .where("id", req.query.id)
        .update({ name: req.body.name }, ["id", "name"])
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
    // deleteFailureType
    if ("id" in req.query) {
      conn("failuretypes")
        .where("id", req.query.id)
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
