const express = require("express");
const cors = require("cors");
const ku = require("./app/utils/KafkaUtil.js");
const fileUpload = require("express-fileupload");
const logger = require("./app/utils/Logger.js");

const app = express();
const db = require("./app/models");

let forceFlag = false;
let kafkaFlag = false;

process_args();

init_app();
init_db();
if (kafkaFlag) {
	ku.init();
}

require("./app/routes/doer.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
	logger.info("Server is running on port: " + PORT);
});

module.exports = app;

function init_db() {
	db.sequelize
		.sync({ force: forceFlag })
		.then(() => {
			logger.info("Synced db.");
		})
		.catch((err) => {
			logger.fatal("Failed to sync db: " + err.message);
			return;
		});
}

function process_args() {
	let customIndex = process.argv.indexOf("--force_sync");
	if (customIndex > -1) {
		forceFlag = process.argv[customIndex + 1];
	}

	customIndex = process.argv.indexOf("--use_kafka");
	if (customIndex > -1) {
		kafkaFlag = process.argv[customIndex + 1];
	}
}

function init_app() {
	app.use((req, res, next) => {
		logger.info("DOER API -- method: " + req.method + " called for path: " + req.url);
		next();
	});

	// setup cors support
	var corsOptions = {
		origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
	};

	app.use(cors(corsOptions));

	// parse requests of content-type - application/json
	app.use(express.json());

	// parse requests of content-type - application/x-www-form-urlencoded
	app.use(express.urlencoded({ extended: true }));

	// setup file upload handler
	app.use(fileUpload());
}
