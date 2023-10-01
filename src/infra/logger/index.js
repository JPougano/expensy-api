const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, colorize, errors } = format;
const { LOG_LEVEL } = process.env;

module.exports = () => {
  const consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return `${level} [${timestamp}]: ${stack || message}`;
  });

  const transportArray = [
    new transports.Console({
      format: combine(
        colorize(),
        format.metadata(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        consoleFormat
      ),
    })
  ];

  const logger = createLogger({
    level: LOG_LEVEL,
    defaultMeta: { service: "user-service" },
    transports: transportArray,
  });

  return logger;
};