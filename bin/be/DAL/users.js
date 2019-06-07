/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const storage = require("./storageRequester");

module.exports = {
  create(accid, projectid, cb) {
    const message = [
      {
        idprojects: projectid,
        idaccounts: accid
      }
    ];
    storage("POST", "/tables/users/rows", message, function(
      err,
      response,
      body
    ) {
      if (!err) {
        if (response.statusCode === 201) {
          cb(false, { message: "Allocation created" });
        } else {
          cb(false, { message: "Allocation error" });
        }
      } else {
        cb(true, "Relational Storage Component not responding");
      }
    });
  },
  getByProject(projectid, cb) {
    storage(
      "GET",
      `/tables/users_on_projects/rows?filter=idprojects=${projectid}`,
      {},
      function(error, response, body) {
        if (!error) {
          let json;
          if (response.statusCode === 200) {
            json = JSON.parse(response.body);
            cb(false, json.list_of_rows);
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
  getNotInProject(projectid, cb) {
    storage(
      "GET",
      `/tables/users_on_projects/rows?filter=idprojects!=${projectid}`,
      {},
      function(error, response, body) {
        if (!error) {
          let json;
          if (response.statusCode === 200) {
            json = JSON.parse(response.body);
            cb(false, json.list_of_rows);
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
  deleteById(allocationid, cb) {
    storage(
      "DELETE",
      `/tables/users/rows?filter=idusers=${allocationid}`,
      {},
      function(error, response, body) {
        if (!error) {
          cb(false, { message: "Allocation is deleted" });
        } else {
          cb(true, "Relational Storage Component not responding");
        }
      }
    );
  }
};
