// Imports
const winston = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const { combine, timestamp, json, errors } = winston.format;
const path = require('path');

// Import the EventEmitter class
const EventEmitter = require('events');

// Create an instance of the EventEmitter class
const myEmitter = new EventEmitter();

// Create a 'logs' directory if it doesn't exist
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Get current date
function getCurrentDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Initiate daily log files inside the 'logs' directory for combined logs
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: `${logsDir}/%DATE%/combined-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d'
});

// Initiate daily log files inside the 'logs' directory for error logs
const errorFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: `${logsDir}/%DATE%/error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '30d'
});

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    json(),
    errors({ stack: true })
  ),
  defaultMeta: { service: 'admin-service' },
  transports: [
    fileRotateTransport,
    errorFileRotateTransport,
    new winston.transports.Console({
      format: combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: 'info'
    })
  ],
  exitOnError: false,
  handleExceptions: true, 
  handleRejections: true 
});

process.on('uncaughtException', (error) => {
  logger.error({ message: `Uncaught Exception: ${error.message}` });
  process.exit(1);
});

// Fired when a log file is created
fileRotateTransport.on('new', (filename) => {
  logger.log({
    level: 'info',
    message: `A new log file was created: ${filename}`
  });
});

// Fired when a log file is rotated
fileRotateTransport.on('rotate', (oldFilename, newFilename) => {
  logger.log({
    level: 'info',
    message: `A log file was rotated. Old filename: ${oldFilename}. New filename: ${newFilename}`
  });
});

// Fired when a log file is deleted
fileRotateTransport.on('logRemoved', (removedFilename) => {
  const newFilename = removedFilename.replace(logsDir, path.join(logsDir, getCurrentDate()));
  logger.log({
    level: 'info',
    message: `A log file was removed: ${newFilename}`
  });
});

// Listen for 'event' events
myEmitter.on('event', (url, level, message) => {
  logger.log({
    level: level,
    message: `Event occurred: ${message}. URL: ${url}`
  });
});

logger.exitOnError = false;

// Export logger and event emitter
module.exports = {
  logger,
  myEmitter
};
