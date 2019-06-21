/* eslint-disable no-lonely-if */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

const logger = require("../config/logger");
const conn = require("../config/conn");

module.exports = {
  get(req, res, next) {
    if (req.query.id) {
      // `getAlarm`
      // ejemplo:
      // Usar el objeto knex y con knex (https://knexjs.org)
      // construir y ejecutar las queries.
      // Devolver el resultado con express.
      // TODO
      conn
        .select(
          "id",
          "timestamp",
          "status",
          "code",
          "name",
          "type",
          "machine",
          "company",
          "origin",
          "comment"
        )
        .from("alarms")
        .where("id", req.query.id)
        .then(vals => {
          const resp = [];
          for (let i = 0; i < vals.length; i += 1) {
            const a0 = vals[i];
            const alarm = {
              id: a0.id,
              timestamp: a0.timestamp,
              status: a0.status,
              code: a0.code,
              name: a0.name,
              type: a0.type,
              machine: a0.machine,
              company: a0.company,
              origin: a0.origin,
              comment: a0.comment
            };
            resp[i] = alarm;
          }

          res.json(resp);
        })
        .catch(e => {
          logger.error(e.message);
          res.status(500).end();
        });
    } else if (req.query.company) {
      // `getAlarmsByCompany``
      conn
        .select(
          "id",
          "timestamp",
          "status",
          "code",
          "name",
          "type",
          "machine",
          "company",
          "origin",
          "comment"
        )
        .from("alarms")
        .where("company", req.query.company)
        .then(vals => {
          const resp = [];
          for (let i = 0; i < vals.length; i += 1) {
            const a0 = vals[i];
            const alarm = {
              id: a0.id,
              timestamp: a0.timestamp,
              status: a0.status,
              code: a0.code,
              name: a0.name,
              type: a0.type,
              machine: a0.machine,
              company: a0.company,
              origin: a0.origin,
              comment: a0.comment
            };
            resp[i] = alarm;
          }
        })
        .catch(e => {
          logger.error(e.message);
          res.status(500).end();
        });
    } else {
      // `getAlarms`
      conn
        .select(
          "id",
          "timestamp",
          "status",
          "code",
          "name",
          "type",
          "machine",
          "company",
          "origin",
          "comment"
        )
        .from("alarms")
        .then(vals => {
          const resp = [];
          for (let i = 0; i < vals.length; i += 1) {
            const a0 = vals[i];
            const alarm = {
              id: a0.id,
              timestamp: a0.timestamp,
              status: a0.status,
              code: a0.code,
              name: a0.name,
              type: a0.type,
              machine: a0.machine,
              company: a0.company,
              origin: a0.origin,
              comment: a0.comment
            };
            resp[i] = alarm;
          }
        })
        .catch(e => {
          logger.error(e.message);
          res.status(500).end();
        });
    }
  },
  create(req, res, next) {
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
      const alarm = {
        timestamp: body.timestamp,
        status: body.status,
        code: body.code,
        name: body.name,
        type: body.type,
        machine: body.machine,
        company: body.company,
        origin: body.origin,
        comment: body.comment
      };
      conn("alarms").insert(alarm);
    }
  },
  update(req, res, next) {
    if (req.query.id) {
      // editAlarm or changeStatusAlarm
      const { body } = req;
      if (
        "status" in body &&
        !("timestamp" in body) &&
        !("code" in body) &&
        !("name" in body) &&
        !("type" in body) &&
        !("machine" in body) &&
        !("company" in body) &&
        !("origin" in body) &&
        !("comment" in body)
      ) {
        // changeStatusAlarm
        conn("alarms")
          .where("id", req.query.id)
          .update("status", body.status)
          .then(val => {
            logger.info(val);
            res.status(201).send(val);
          })
          .catch(err => {
            logger.error(err.message);
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
        conn("alarms")
          .where("id", req.query.id)
          .update({
            timestamp: body.timestamp,
            status: body.status,
            code: body.code,
            name: body.name,
            type: body.type,
            machine: body.machine,
            company: body.company,
            origin: body.origin,
            comment: body.comment
          })
          .then(val => {
            logger.info(val);
            res.status(201).send(val);
          })
          .catch(err => {
            logger.error(err.message);
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
  delete(req, res, next) {
    if (req.query.id) {
      conn("alarms")
        .where("id", req.query.id)
        .del()
        .then(val => {
          logger.info(val);
          res.status(200).send(val);
        })
        .catch(err => {
          logger.error(err.message);
          res.status(500).end();
        });
    } else {
      res.status(422).json({
        message: "Missing required field Request ID in the query string"
      });
    }
  }
};
