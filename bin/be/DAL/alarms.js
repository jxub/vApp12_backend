/* eslint-disable func-names */

const storage = require("./storage");

module.exports = {
  getByCompany(company) {
    storage(
      "GET",
      `/tables/alarms/rows?filter=company='${company}'`,
      {},
      // eslint-disable-next-line no-unused-vars
      (error, response, _body) => {
        let json;
        return new Promise((resolve, reject) => {
          if (!error) {
            json = JSON.parse(response.body);
            if (response.statusCode === 200) {
              resolve({ message: json.list_of_rows });
            } else {
              resolve({ message: json.message });
            }
          } else {
            reject(new Error("Alarm could not be retrieved"));
          }
        });
      }
    );
  },
  getById(AccountId, ProjectId, cb) {
    storage(
      "GET",
      `/tables/allocated_projects/rows?filter=idaccounts='${AccountId}' and idprojects='${ProjectId}'`,
      {},
      // eslint-disable-next-line no-unused-vars
      (error, response, _body) => {
        if (!error) {
          let json;
          if (response.statusCode === 200) {
            json = JSON.parse(response.body);
            cb(false, json.list_of_rows[0]);
          } else {
            json = JSON.parse(response.body);
            cb(false, json.message);
          }
        } else {
          cb(true, "Relational Storage Component not responding");
        }
      }
    );
  },
  getByName(alarmName) {
    storage(
      "GET",
      `/tables/projects/rows?filter=name='${alarmName}'`,
      {},
      // eslint-disable-next-line no-unused-vars
      (error, response, _body) => {
        return new Promise((resolve, reject) => {
          if (!error) {
            let json;
            if (response.statusCode === 200) {
              json = JSON.parse(response.body);
              resolve({ message: json.list_of_rows[0] });
            } else {
              json = JSON.parse(response.body);
              reject(new Error(`${json.message}`));
            }
          } else {
            reject(new Error("Alarm could not be retrieved"));
          }
        });
      }
    );
  },
  create: ({
    timestamp,
    status,
    code,
    name,
    type,
    company,
    origin,
    comment
  }) => {
    storage(
      "POST",
      "tables/alarms/rows",
      {
        timestamp,
        status,
        code,
        name,
        type,
        company,
        origin,
        comment
      },
      // eslint-disable-next-line no-unused-vars
      (err, _resp, _body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            resolve({ message: "Alarm created" });
          } else {
            reject(new Error("Alarm could not be created"));
          }
        });
      }
    );
  },
  update: ({
    timestamp,
    status,
    code,
    name,
    type,
    company,
    origin,
    comment
  }) => {
    storage(
      "PATCH",
      "tables/alarms/rows",
      {
        timestamp,
        status,
        code,
        name,
        type,
        company,
        origin,
        comment
      },
      // eslint-disable-next-line no-unused-vars
      (err, _resp, _body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            resolve({ message: "Alarm updated" });
          } else {
            reject(new Error("Alarm could not be updated"));
          }
        });
      }
    );
  },
  updateName(alarmID, newName) {
    storage(
      "PATCH",
      `/tables/alarms/rows?filter=id=${alarmID}`,
      { name: newName },
      // eslint-disable-next-line no-unused-vars
      (error, response, _body) => {
        return new Promise((resolve, reject) => {
          if (!error) {
            resolve({ message: "Alarm name is updated" });
          } else {
            reject(new Error(`Alarm name could not be updated: ${response}`));
          }
        });
      }
    );
  },
  updateDescription(projectId, newDescription, cb) {
    storage(
      "PATCH",
      `/tables/alarms/rows?filter=id=${projectId}`,
      { description: newDescription },
      function(error, _response, _body) {
        if (!error) {
          cb(false, { message: "Project is updated" });
        } else {
          cb(true, "Relational Storage Component not responding");
        }
      }
    );
  },
  updateThold(alarmID, newThold) {
    storage(
      "PATCH",
      `/tables/alarms/rows?filter=id=${alarmID}`,
      { threshold: newThold },
      // eslint-disable-next-line no-unused-vars
      (err, _response, _body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            resolve({ message: "Alarm threshold updated" });
          } else {
            reject(new Error("Alarm threshold could not be updated"));
          }
        });
      }
    );
  },
  updateStatus(alarmID, newStatus) {
    storage(
      "PATCH",
      `/tables/alarms/rows?filter=id=${alarmID}`,
      { status: newStatus },
      // eslint-disable-next-line no-unused-vars
      (err, _response, _body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            resolve({ message: "Alarm status updated" });
          } else {
            reject(new Error("Alarm status could not be updated"));
          }
        });
      }
    );
  },
  delete(alarmID) {
    storage(
      "DELETE",
      `/tables/alarms/rows?filter=id=${alarmID}`,
      {},
      // eslint-disable-next-line no-unused-vars
      (err, _resp, _body) => {
        return new Promise((resolve, reject) => {
          if (!err) {
            resolve({ message: "Alarm deleted" });
          } else {
            reject(new Error("Alarm could not be deleted"));
          }
        });
      }
    );
  }
};
