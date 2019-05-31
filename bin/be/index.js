#!/usr/bin/env node
/* eslint-disable func-names */

// const path = require("path");
const baseDir = require("app-root-path").path;
require("app-module-path").addPath(baseDir);

const debug = require("debug")("vfos-usecase:server");
const http = require("http");

const dal = require("./DAL");
const app = require("./app");

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "4200");
console.info("backend is running internally at ", port);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * DB population check
 */

function init() {
  console.log("Checking DB...");
  dal.init.dbExists(function(exists) {
    if (exists) {
      console.log("OK");
      console.log("Checking tables...");
      dal.init.tablesExistsAndCreates(function(tablesdone) {
        if (tablesdone) {
          console.log("Checking tables - DONE");
          console.log("Checking views...");
          dal.init.viewsExistsAndCreates(function(viewsdone) {
            if (viewsdone) {
              console.log("Checking views - DONE");
              console.log("Checking roles...");
              dal.init.checkRoles(function(rolesExist) {
                if (rolesExist) {
                  console.log("Checking roles - DONE");
                } else {
                  console.log("Creating roles...");
                  dal.init.createRoles(function(rolesdone) {
                    if (rolesdone) {
                      console.log("Creating roles - DONE");
                    } else {
                      console.log("NOT IMPLEMENTED :(");
                    }
                  });
                }
              });
            } else {
              console.log("NOT IMPLEMENTED :(");
              console.log("Creating roles...");
              dal.init.createRoles(function(rolesdone) {
                if (rolesdone) {
                  console.log("Creating roles - DONE");
                } else {
                  console.log("NOT IMPLEMENTED :(");
                }
              });
            }
          });
        } else {
          console.log("NOT IMPLEMENTED :(");
        }
      });
    } else {
      console.log("DB does not exist");
      console.log("Creating DB");
      dal.init.createDB(function(ok) {
        if (ok) {
          console.log("DB created");
          console.log("Creating tables");
          dal.init.tablesExistsAndCreates(function(tablesdone) {
            if (tablesdone) {
              console.log("Creating tables - DONE");
              console.log("Checking views...");
              dal.init.viewsExistsAndCreates(function(viewsdone) {
                if (viewsdone) {
                  console.log("Creating views - DONE");
                } else {
                  console.log("NOT IMPLEMENTED :(");
                }
              });
            } else {
              console.log("NOT IMPLEMENTED :(");
            }
          });
        } else {
          console.log("something went wrong on db creation...");
        }
      });
    }
  });
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log("INIT DB...");
  init();
}
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// function run() {}
