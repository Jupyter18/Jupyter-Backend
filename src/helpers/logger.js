/**
 * Logger used to log information differently based on their priority
 * @category Helpers
 */

const winston = require('winston');
const config = require('../config');

const transports = [];

if (config.env === 'production') {
  transports.push(new winston.transports.Console());
} else {
  transports.push(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
    ),
  }));
}

const logger = winston.createLogger({
  level: config.log.level,
  transports,
  format: winston.format.combine(
    winston.format.cli({ colors: { info: 'blue', error: 'red', warn: 'yellow' } }),
    winston.format.splat(),
  ),
});

module.exports = logger;
