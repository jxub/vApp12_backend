const storage = require("./storage");

module.exports = {
  /**
   * Retrieves all or one alarmtype depending
   * on whether the code is defined or not.
   * @param {*} code the alarm type code
   */
  get({ code }) {
    let endpoint;
    if (!code) {
      endpoint = `tables/alarmtypes/rows`;
    } else {
      endpoint = `tables/alarmtypes/rows?filter=code=${code}`;
    }
    storage(
      "GET",
      endpoint,
      {},
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
  delete({ code }) {
    storage(
      "DELETE",
      `tables/alarmtypes/rows?filter=code=${code}`,
      {},
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
  }
};
