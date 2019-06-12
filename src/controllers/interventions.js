const interventions = require("../dal/interventions");
const logger = require("../config/logger");

module.exports = {
  get(req, res, next) {
    if ("company" in req.query) {
      // getInterventionsbyCompany
      interventions
        .get({ company: req.query.company })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else if ("alarmid" in req.query) {
      // getInterventionbyAlarm
      interventions
        .get({ alarmID: req.query.alarmid })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else if ("id" in req.query) {
      interventions
        .get({ ID: req.query.id })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      interventions
        .get({})
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    }
  },
  create(req, res, next) {
    const { body } = req;
    if (
      "solution" in body &&
      "timestamp" in body &&
      "duration" in body &&
      "alarmid" in body &&
      "status" in body &&
      "comment" in body
    ) {
      interventions
        .create({
          solution: body.solution,
          timestamp: body.timestamp,
          alarmID: body.alarmid,
          status: body.status,
          comment: body.comment
        })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  update(req, res, next) {
    const { body } = req;
    if (
      "solution" in body &&
      "timestamp" in body &&
      "duration" in body &&
      "alarmid" in body &&
      "status" in body &&
      "comment" in body
    ) {
      interventions
        .update({
          solution: body.solution,
          timestamp: body.timestamp,
          alarmID: body.alarmid,
          status: body.status,
          comment: body.comment
        })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  delete(req, res, next) {
    if (req.query.id) {
      interventions
        .delete({ ID: req.query.id })
        .then(val => {
          logger.debug(val);
          res.send(val);
        })
        .catch(err => {
          logger.error(err);
          res.status(500).end();
        });
    } else {
      res
        .status(422)
        .json({ message: "Missing required field: id in query string" });
    }
  }
};
