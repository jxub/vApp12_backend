const storage = require("./storage");

module.exports = {
  get() {},
  create({ code, name }) {
    // eslint-disable-next-line no-unused-vars
    storage(
      "POST",
      "tables/alarmtypes/rows",
      { code, name },
      // eslint-disable-next-line no-unused-vars
      (err, resp, body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            return resolve({ message: resp });
          }
          return reject(new Error(`${resp}`));
        });
      }
    );
  },
  update({ code, name }) {
    storage(
      "PATCH",
      `tables/alarmtypes/rows?filter=code=${code}`,
      { name },
      // eslint-disable-next-line no-unused-vars
      (err, resp, body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            return resolve({ message: resp });
          }
          return reject(new Error(`${resp}`));
        });
      }
    );
  },
  delete() {}
};
