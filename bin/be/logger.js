const winston = require("winston");

const level = process.env.LOG_LEVEL || "debug";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp: () => {
        return new Date().toISOString();
      }
    }),
    new winston.transports.File({
      level,
      filename: "debug.log"
    })
  ]
});

module.exports = logger;
