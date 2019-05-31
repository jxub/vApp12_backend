var dal = require('../DAL');

module.exports = {
    get: function (req, res) {
        if (req.query.projectid) {
            dal.users.getByProject(req.query.projectid, function (err, response) {
                if (!err) {
                    res.status(200).json(response);
                } else {
                    res.status(500).end();
                }
            })
        } else {
            if (req.query.outprojectid) {
                dal.users.getNotInProject(req.query.outprojectid, function (err, response) {
                    if (!err) {
                        res.status(200).json(response);
                    } else {
                        res.status(500).end();
                    }
                })
            } else {
                res.status(501).end();
            }
        }
    },
    create: function (req, res) {
        if (req.body.accountid && req.body.projectid) {
            dal.users.create(req.body.accountid, req.body.projectid, function (err, response) {
                if (!err) {
                    res.status(201).json({ message: "Allocation created" });
                } else {
                    res.status(500).end();
                }
            })
        } else {
            res.status(422).json({ message: "Missing required parameters" })
        }
    },
    update: function (req, res) {
        if (true) {
            res.status(501).json({message: "Not implemented"})
        } else {
            res.status(422).json({message: "Missing required fields"})
        }
    },
    delete: function (req, res) {
        if (req.query.id) {
            dal.users.deleteById(req.query.id, function (err, answer) {
                if (!err) {
                    res.status(200).send(answer);
                } else {
                    res.status(500).end();
                }
            })
        } else {
            res.status(422).json({ message: "Missing required field" })
        }
    },
}