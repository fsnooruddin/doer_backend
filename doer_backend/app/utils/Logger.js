const pino = require("pino");

const transports = pino.transport({
	targets: [
		{
			level: "trace",
			target: "pino/file",
			options: { destination: "./logs/log.txt" },
		},
		{
			level: "trace",
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	],
});

const logger = pino(
	{
		level: "trace",
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
