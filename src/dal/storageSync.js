const syncrequest = require("sync-request");
const config = require("../config/config.json");

// eslint-disable-next-line func-names
module.exports = (method, path, payload) => {
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
  return syncrequest(method, options.url, options);
};
