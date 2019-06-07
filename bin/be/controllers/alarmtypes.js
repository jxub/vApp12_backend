const alarmtypes = require("./../DAL/alarmtypes");
const logger = require("./../logger");

module.exports = {
  // eslint-disable-next-line no-unused-vars
  get(req, res) {
    // TODO
    alarmtypes
      .getAll()
      .then(resp => {
        logger.info(resp);
      })
      .catch(err => {
        logger.error(err);
      });
  },
  create(req, res) {
    if (true) {
      res.status(501).json({ message: "Not implemented" });
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
    if (true) {
      res.status(501).json({ message: "Not implemented" });
    } else {
      res.status(422).json({ message: "Missing required fields" });
    }
  }
};
