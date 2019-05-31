/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const dal = require("../DAL");

module.exports = {
  get(req, res) {
    if (req.query.project) {
      // get equipments from project
      dal.equipments.getByProjectId(req.query.project, function(err, answer) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else {
      // get all equipments
      // not implemented - TODO
      res.status(501).end();
    }
  },
  create(req, res) {
    if (req.body.name && req.body.projectid) {
      dal.equipments.create(req.body.name, req.body.projectid, function(
        err,
        response
      ) {
        if (!err) {
          res.status(201).end();
        } else {
          res.status(500).json(err);
        }
      });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  update(req, res) {
    if (true) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  delete(req, res) {
    if (req.query.id) {
      dal.equipments.delete(req.query.id, function(err, response) {
        if (!err) {
          res.status(200).end();
        } else {
          res.status(500).end();
        }
      });
    } else {
      res.status(422).json({ message: "Missing required parameter" });
    }
  }
};
