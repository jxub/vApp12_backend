#!/usr/bin/env node
/* eslint-disable func-names */

// const path = require("path");
const baseDir = require("app-root-path").path;
require("app-module-path").addPath(baseDir);

const debug = require("debug")("vfos-usecase:server");
const http = require("http");

const logger = require("./config/logger");
const dal = require("./dal");
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
logger.info("backend is running internally at ", port);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * DB population check
 */

function init() {
  logger.info("Checking DB...");
  dal.init.dbExists(function(exists) {
    if (exists) {
      logger.info("OK");
      logger.info("Checking tables...");
      dal.init.tablesExistsAndCreates(function(tablesdone) {
        if (tablesdone) {
          logger.info("Checking tables - DONE");
          logger.info("Checking views...");
          dal.init.viewsExistsAndCreates(function(viewsdone) {
            if (viewsdone) {
              logger.info("Checking views - DONE");
              logger.info("Checking roles...");
              dal.init.checkRoles(function(rolesExist) {
                if (rolesExist) {
                  logger.info("Checking roles - DONE");
                } else {
                  logger.info("Creating roles...");
                  dal.init.createRoles(function(rolesdone) {
                    if (rolesdone) {
                      logger.info("Creating roles - DONE");
                    } else {
                      logger.info("NOT IMPLEMENTED :(");
                    }
                  });
                }
              });
            } else {
              logger.info("NOT IMPLEMENTED :(");
              logger.info("Creating roles...");
              dal.init.createRoles(function(rolesdone) {
                if (rolesdone) {
                  logger.info("Creating roles - DONE");
                } else {
                  logger.info("NOT IMPLEMENTED :(");
                }
              });
            }
          });
        } else {
          logger.info("NOT IMPLEMENTED :(");
        }
      });
    } else {
      logger.info("DB does not exist");
      logger.info("Creating DB");
      dal.init.createDB(function(ok) {
        if (ok) {
          logger.info("DB created");
          logger.info("Creating tables");
          dal.init.tablesExistsAndCreates(function(tablesdone) {
            if (tablesdone) {
              logger.info("Creating tables - DONE");
              logger.info("Checking views...");
              dal.init.viewsExistsAndCreates(function(viewsdone) {
                if (viewsdone) {
                  logger.info("Creating views - DONE");
                } else {
                  logger.info("NOT IMPLEMENTED :(");
                }
              });
            } else {
              logger.info("NOT IMPLEMENTED :(");
            }
          });
        } else {
          logger.info("something went wrong on db creation...");
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
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
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
  logger.info("schema DB...");
  init();
}
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// function run() {}
