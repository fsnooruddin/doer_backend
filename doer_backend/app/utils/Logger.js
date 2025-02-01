const pino = require("pino");

const transports = pino.transport({
	targets: [
		{
			level: "info",
			target: "pino/file",
			options: { destination: "./logs/log.txt" },
		},
		{
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	],
});

const logger = pino(transports);

module.exports = logger;
