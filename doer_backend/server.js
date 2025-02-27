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
	db.doers = require("./app/models/doer.model.js")(db.sequelize, db.Sequelize);
	db.users = require("./app/models/user.model.js")(db.sequelize, db.Sequelize);
	db.categories = require("./app/models/category.model.js")(db.sequelize, db.Sequelize);
	db.otps = require("./app/models/otp.model.js")(db.sequelize, db.Sequelize);
	db.badges = require("./app/models/badge.model.js")(db.sequelize, db.Sequelize);
	db.jobs = require("./app/models/job.model.js")(db.sequelize, db.Sequelize);
	db.job_histories = require("./app/models/job_history.model.js")(db.sequelize, db.Sequelize);
	db.doer_trips = require("./app/models/doer_trip.model.js")(db.sequelize, db.Sequelize);
	db.doer_trip_location_updates = require("./app/models/doer_trip_location_update.model.js")(db.sequelize, db.Sequelize);
	db.reviews = require("./app/models/review.model.js")(db.sequelize, db.Sequelize);
	db.ratings = require("./app/models/rating.model.js")(db.sequelize, db.Sequelize);
	db.invoices = require("./app/models/invoice.model.js")(db.sequelize, db.Sequelize);
	db.messages = require("./app/models/message.model.js")(db.sequelize, db.Sequelize);
	db.addresses = require("./app/models/address.model.js")(db.sequelize, db.Sequelize);
	db.user_badge_associations = require("./app/models/user_badge_association.model.js")(db.sequelize, db.Sequelize);
	db.job_costs = require("./app/models/job_cost.model.js")(db.sequelize, db.Sequelize);
	db.certificates = require("./app/models/certificate.model.js")(db.sequelize, db.Sequelize);
    db.tests = require("./app/models/testing.model.js")(db.sequelize, db.Sequelize);
    db.availability_slots = require("./app/models/availability_slot.model.js")(db.sequelize, db.Sequelize);

	db.users.hasMany(db.addresses, { foreignKey: "user_id", as: "addresses" });
	//db.addresses.belongsTo(db.users, { foreignKey: "user_id", as: "users" });

	db.users.hasMany(db.jobs, { foreignKey: "user_id", as: "jobs" });
	db.jobs.hasOne(db.users, { foreignKey: "user_id", as: "users" });

	db.doers.hasMany(db.jobs, { foreignKey: "doer_id", as: "jobs" });
	db.jobs.hasOne(db.doers, { foreignKey: "doer_id", as: "doers" });

	db.doers.hasMany(db.ratings, { foreignKey: "doer_id", as: "ratings" });

	db.doers.hasMany(db.reviews, { foreignKey: "doer_id", as: "reviews" });

	db.badges.belongsToMany(db.users, { through: db.user_badge_associations, foreignKey: "badge_id", as: "badges", otherKey: "user_id" });
	db.users.belongsToMany(db.badges, { through: db.user_badge_associations, foreignKey: "badge_id", otherKey: "user_id" });

	db.jobs.hasMany(db.job_costs, { foreignKey: "job_id", as: "costs" });

    db.doers.hasMany(db.certificates , { foreignKey: "doer_id", as: "certificates" });

    db.doers.hasMany(db.availability_slots , { foreignKey: "doer_id"});

	db.sequelize
		.sync({ force: forceFlag })
		.then(() => {
			logger.info("Synced db.");
		})
		.catch((err) => {
			logger.fatal("Failed to sync db: " + err.message);
			logger.fatal("Failed to sync db: " + err.stack.toString());
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
