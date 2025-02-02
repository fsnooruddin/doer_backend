const winston = require("winston");

const logLevels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	trace: 5,
};

const color = {
'fatal': "\x1b[38;5;196m",
'error': "\x1b[41m",
'warn': "\x1b[38;5;166m",
'info': "\x1b[38;5;214m",
'debug': "\x1b[38;5;33m",
'trace': "\x1b[38;5;118m"
};

const { combine, timestamp, printf, colorize, align } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
return `${level}: ${color[level] || ''} ${timestamp} || ${message}\x1b[0m `;
});

const logger = winston.createLogger({
	levels: logLevels,
	level: process.env.LOG_LEVEL || "info",
	format: combine(
		timestamp({
			format: "YYYY-MM-DD hh:mm:ss.SSS A",
		}),
		myFormat
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "combined.log",
		}),
	],
});

module.exports = logger;
