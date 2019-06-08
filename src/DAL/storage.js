const request = require("request");
const config = require("../config.json");

// eslint-disable-next-line func-names
module.exports = (method, path, payload, callback) => {
  const options = {
    url: `${config.storage.url}/databases/${
      config.storage.dataBaseName
    }${path}`,
    method,
    headers: {
      "Content-Type": config.storage.contentType,
      Accept: config.storage.accept,
      Authorization: config.storage.auth
    },
    body: JSON.stringify(payload)
  };
  request(options, callback);
};
