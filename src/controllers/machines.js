/* eslint-disable no-unused-vars */
const conn = require("../config/conn");
const logger = require("../config/logger");

// connect to the driver interface to recover machine names and device id
// https://vfos-docs.ascora.eu/#get-data-from-sensor

module.exports = {
  get(req, res, next) {
    if (req.params.id) {
      // getMachine
      conn
        .select("id", "name")
        .from("machines")
        .where("id", req.params.id)
        .limit(1)
        .then(row => {
          if (row.length) {
            const m = row[0];
            res.json({
              id: m.id,
              name: m.name
            });
          } else {
            res.status(500).end();
          }
        })
        .catch(err => {
          logger.error(err.message);
          res.status(500).end();
        });
    } else {
      // getMachines
      conn
        .select("id", "name")
        .from("machines")
        .then(rows => {
          res.json(rows);
        })
        .catch(err => {
          logger.error(err.message);
          res.status(500).end();
        });
    }
  },
  create(req, res, next) {
    if ("name" in req.body) {
      // createMachine
      conn("machines")
        .insert({
          name: req.body.name
        })
        .then(ids => {
          res.status(201).json({ message: `created ${ids}` });
        })
        .catch(err => {
          res.status(500).end();
        });
    } else {
      // bad request
      res.status(400).end();
    }
  },
  update(req, res, next) {
    if (req.query.id && req.body.name) {
      conn("machines")
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
    if (req.query.id) {
      conn("machines")
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
