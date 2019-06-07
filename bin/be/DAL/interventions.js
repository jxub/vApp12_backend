const storage = require("./storage");

const exists = val => {
  if (val === null || val === undefined) {
    return false;
  }

  return true;
};

module.exports = {
  get({ ID, alarmID, company }) {
    if (exists(ID)) {
      // eslint-disable-next-line no-unused-vars
      storage("PUT", true, true, (err, resp, body) => {});
    } else if (exists(alarmID)) {
      // get by alarm
    } else if (exists(company)) {
      // get by company
    } else {
      // get all
    }
  },
  // eslint-disable-next-line no-unused-vars
  create({ solution, timestamp, duration, alarmID, status, comment }) {},
  // eslint-disable-next-line no-unused-vars
  update({ solution, timestamp, duration, alarmID, status, comment }) {},
  // eslint-disable-next-line no-unused-vars
  delete({ ID }) {}
};
