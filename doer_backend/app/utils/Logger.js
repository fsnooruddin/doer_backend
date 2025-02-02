const winston = require("winston");

const logLevels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	trace: 5,
};

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
	levels: logLevels,
	level: process.env.LOG_LEVEL || "trace",
	format: combine(
		timestamp({
			format: "YYYY-MM-DD hh:mm:ss.SSS A",
		}),
		align(),
		printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "combined.log",
		}),
	],
});

module.exports = logger;
