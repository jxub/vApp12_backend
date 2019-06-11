#!/usr/bin/env node
/* eslint-disable func-names */

const baseDir = require("app-root-path").path;
require("app-module-path").addPath(baseDir);

const debug = require("debug")("vapp12:backend");
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


const schema = require("./dal/schema");
const conn = require("./config/knex");

schema
  .up(conn, logger)
  .then(() => {
    logger.info("created the database");
    schema
      .down(conn, logger)
      .then(() => {
        logger.info("destroyed the database");
        throw new Error("end");
      })
      .catch(msg => {
        logger.error(msg);
      });
  })
  .catch(msg => {
    logger.error(msg);
  });
