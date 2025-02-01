const pino = require("pino");

const transports = pino.transport({
	targets: [
		{
			level: "info",
			target: "pino/file",
			options: { destination: "./logs/log.txt" },
		},
		{
			level: "info",
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	],
});

const logger = pino(
	{
		level: process.env.PINO_LOG_LEVEL || "info",
		timestamp: pino.stdTimeFunctions.isoTime,
		formatters: {
			bindings: (bindings) => {
				return {};
			},
		},
	},
	transports
);

module.exports = logger;
