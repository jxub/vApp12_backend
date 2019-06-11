/* eslint-disable no-lonely-if */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

const logger = require("../config/logger");
const conn = require("../config/knex");
const alarms = require("../dal/alarms");

module.exports = {
  get(req, res) {
    if (req.query.id) {
      // `getAlarm`
      // ejemplo:
      // Usar el objeto conn y con knex (https://knexjs.org)
      // construir y ejecutar las queries.
      // Devolver el resultado con express.
      // TODO
      conn
        .select("id", "origin")
        .from("alarms")
        .then(vals => {
          const resp = [];
          for (let i = 0; i < vals.length; i += 1) {
            resp[i] = vals[i];
          }

          res.status(200).send(resp);
        })
        .catch(e => {
          logger.error(e);

          res.status(500).end();
        });

      /*
      alarms
        .getById(req.query.id)
        .then(resp => {
          logger.debug(resp);
          req.status(200).send(resp);
        })
        .catch(err => {
          logger.error(err);
          req.status(500).end();
        });
      */
    } else if (req.query.company) {
      // `getAlarmsByCompany``
      alarms
        .getByCompany(req.query.company)
        .then(resp => {
          logger.debug(resp);
          req.status(200).send(resp);
        })
        .catch(err => {
          logger.error(err);
          req.status(500).end();
        });
    } else {
      // `getAlarms`
      // TODO: not implemented!
      alarms
        .getByUser(req.user.id)
        .then(resp => {
          logger.debug(resp);
          req.status(200).send(resp);
        })
        .catch(err => {
          logger.error(err);
          req.status(500).json({ message: err.message });
        });
    }
  },
  create(req, res) {
    const { body } = req;
    if (
      "timestamp" in body &&
      "status" in body &&
      "code" in body &&
      "name" in body &&
      "type" in body &&
      "machine" in body &&
      "company" in body &&
      "origin" in body &&
      "comment" in body
    ) {
      alarms
        .create(
          body.timestamp,
          body.status,
          body.code,
          body.name,
          body.type,
          body.machine,
          body.company,
          body.origin,
          body.comment
        )
        .then(val => {
          logger.info(val.message);
          res.status(200).send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res.status(500).end();
    }
  },
  update(req, res) {
    if (req.query.id) {
      // editAlarm or changeStatusAlarm
      const { body } = req;
      if ("status" in body && !("name" in body)) {
        // changeStatusAlarm
        alarms
          .updateStatus(req.query.id, body.status)
          .then(val => {
            logger.info(val.message);
            res.status(201).send(val);
          })
          .catch(err => {
            logger.error(err);
            res.status(500).end();
          });
      } else if (
        "timestamp" in body &&
        "status" in body &&
        "code" in body &&
        "name" in body &&
        "type" in body &&
        "machine" in body &&
        "company" in body &&
        "origin" in body &&
        "comment" in body
      ) {
        // editAlarm
        alarms
          .update(
            body.timestamp,
            body.status,
            body.code,
            body.name,
            body.type,
            body.machine,
            body.company,
            body.origin,
            body.comment
          )
          .then(val => {
            logger.info(val.message);
            res.status(200).send(val);
          })
          .catch(err => {
            logger.error(err);
            res.status(500).end();
          });
      } else {
        res.status(400).json({ message: "Bad values in body" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Request ID missing in the query string" });
    }
  },
  delete(req, res) {
    if (req.query.id) {
      alarms
        .delete(req.query.id)
        .then(resp => {
          logger.debug(resp);
          req.status(200).send(resp);
        })
        .catch(err => {
          logger.error(err);
          req.status(500).end();
        });
    } else {
      res.status(422).json({
        message: "Missing required field Request ID in the query string"
      });
    }
  }
};
