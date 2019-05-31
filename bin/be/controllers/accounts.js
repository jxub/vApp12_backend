/* eslint-disable func-names */

const dal = require("../DAL");

module.exports = {
  get(req, res) {
    if (req.query.filterid) {
      dal.accounts.getFiltered(req.query.filterid, function(err, answer) {
        if (!err) {
          res.status(200).send(answer);
        } else {
          res.status(500).end();
        }
      });
    } else {
      // not implemented
      res.status(501).end();
    }
  }
};
