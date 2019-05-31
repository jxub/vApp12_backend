/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const dal = require("../DAL");

const _getAll = function(req, cb) {
  dal.projects.getByAllocation(req.user.id, function(err, answer) {
    cb(err, answer);
  });
};
const _getById = function(pid) {};

module.exports = {
  get(req, res) {
    if (req.query.id) {
      // get project by id
      dal.projects.getById(req.user.id, req.query.id, function(err, answer) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else {
      // get all projects
      dal.projects.getByAllocation(req.user.id, function(err, answer) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    }
    // res.status(201).json({awesome: "working"})
  },
  create(req, res) {
    // body: {name,description, threshold}
    if (req.body.name && req.body.description && req.body.threshold) {
      dal.projects.create(
        req.body.name,
        req.body.description,
        req.body.threshold,
        function(err, answer) {
          if (!err) {
            // get project by name
            dal.projects.getByName(req.body.name, function(err2, answer2) {
              if (!err2) {
                // define the allocation
                dal.users.create(req.user.id, answer2.idprojects, function(
                  err3,
                  answer3
                ) {
                  if (!err3) {
                    // returning the created project
                    res.status(201).json(answer2);
                  } else {
                    res.status(500).end();
                  }
                });
              } else {
                res.status(500).end();
              }
            });
          } else {
            res.status(500).json(err);
          }
        }
      );
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  },
  update(req, res) {
    console.log("BODY", req.body);
    if (req.body.name) {
      dal.projects.updateName(req.query.id, req.body.name, function(
        err,
        answer
      ) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else if (req.body.description) {
      dal.projects.updateDescription(
        req.query.id,
        req.body.description,
        function(err, answer) {
          if (!err) {
            res.status(200).send(answer);
          } else {
            res.status(500).end();
          }
        }
      );
    } else if (req.body.threshold) {
      dal.projects.updateThold(req.query.id, req.body.threshold, function(
        err,
        answer
      ) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else if (req.body.status || !req.body.status) {
      dal.projects.updateStatus(req.query.id, req.body.status, function(
        err,
        answer
      ) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else {
      res.status(422).json({ message: "Missing required field" });
    }
  },
  delete(req, res) {
    if (req.query.id) {
      dal.projects.delete(req.query.id, function(err, answer) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else {
      res.status(422).json({ message: "Missing required field" });
    }
  }
};
