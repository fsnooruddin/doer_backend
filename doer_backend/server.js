const express = require("express");
const cors = require("cors");

const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const ku = require("./app/utils/KafkaUtil.js");
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

// Route Example
app.get("/", (req, res) => {
	const welcomeMessage = req.t("welcome", { ns: "common" });
	const description = req.t("description", { ns: "common" });
	res.send(`<h1>${welcomeMessage}</h1><p>${description}</p>`);
});

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
	db.doer_ratings = require("./app/models/doer_rating.model.js")(db.sequelize, db.Sequelize);
	db.user_ratings = require("./app/models/user_rating.model.js")(db.sequelize, db.Sequelize);
	db.invoices = require("./app/models/invoice.model.js")(db.sequelize, db.Sequelize);
	db.messages = require("./app/models/message.model.js")(db.sequelize, db.Sequelize);
	db.addresses = require("./app/models/address.model.js")(db.sequelize, db.Sequelize);
	db.user_badge_associations = require("./app/models/user_badge_association.model.js")(db.sequelize, db.Sequelize);
	db.doer_badge_associations = require("./app/models/doer_badge_association.model.js")(db.sequelize, db.Sequelize);
	db.job_costs = require("./app/models/job_cost.model.js")(db.sequelize, db.Sequelize);
	db.certificates = require("./app/models/certificate.model.js")(db.sequelize, db.Sequelize);
	db.tests = require("./app/models/testing.model.js")(db.sequelize, db.Sequelize);
	db.availability_slots = require("./app/models/availability_slot.model.js")(db.sequelize, db.Sequelize);

	db.doer_trips.hasMany(db.doer_trip_location_updates, { foreignKey: "doer_trip_id" });
	db.doer_trip_location_updates.belongsTo(db.doer_trips, { foreignKey: "doer_trip_id" });

	db.jobs.hasMany(db.doer_trips, { foreignKey: "job_id", as: "doer_trips" });
	db.doer_trips.belongsTo(db.jobs, { foreignKey: "job_id", as: "doer_trips" });

	db.users.hasMany(db.addresses, { foreignKey: "user_id", as: "addresses" });
	//db.addresses.belongsTo(db.users, { foreignKey: "user_id", as: "users" });

	db.users.hasMany(db.jobs, { foreignKey: "user_id", as: "jobs" });
	db.jobs.hasOne(db.users, { foreignKey: "user_id", as: "users" });

	db.doers.hasMany(db.jobs, { foreignKey: "doer_id", as: "jobs" });
	db.jobs.hasOne(db.doers, { foreignKey: "doer_id", as: "doers" });

	db.doers.hasOne(db.doer_ratings, { foreignKey: "doer_id", as: "ratings" });

	db.users.hasOne(db.user_ratings, { foreignKey: "user_id", as: "ratings" });

	db.doers.hasMany(db.reviews, { foreignKey: "doer_id", as: "reviews" });
	db.reviews.hasOne(db.doers, { foreignKey: "doer_id", as: "doers" });

	db.badges.belongsToMany(db.users, { through: db.user_badge_associations, foreignKey: "badge_id"});
	db.users.belongsToMany(db.badges, { through: db.user_badge_associations, foreignKey: "user_id"});

	db.badges.belongsToMany(db.doers, { through: db.doer_badge_associations, foreignKey: "badge_id", as: "doer_badges", otherKey: "doer_id" });
	db.doers.belongsToMany(db.badges, { through: db.doer_badge_associations, foreignKey: "badge_id", otherKey: "doer_id" });

	db.jobs.hasMany(db.job_costs, { foreignKey: "job_id", as: "costs" });

	db.doers.hasMany(db.certificates, { foreignKey: "doer_id", as: "certificates" });

	db.doers.hasMany(db.availability_slots, { foreignKey: "doer_id" });

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

	i18next
		.use(Backend)
		.use(i18nextMiddleware.LanguageDetector)
		.init(
			{
				ns: ["common", "category"],
				defaultNS: "common",
				backend: {
					loadPath: path.resolve("./app/resources/locales/{{ns}}/{{lng}}.json"),
				},
				debug: true,
				detection: {
					order: ["querystring", "cookie"],
					caches: ["cookie"],
				},
				saveMissing: true,
				fallbackLng: "en",
				preload: ["en", "es", "fr", "de"],
			},
			(err, t) => {
				if (err) {
					return logger.error("Couldn't initialize i18next, error is: " + err);
				}
				logger.info("i18next is ready...");
				logger.info(t("welcome"));
				logger.info(t("welcome", { lng: "de" }));
			}
		);

	// Middleware
	app.use(cookieParser());
	app.use(i18nextMiddleware.handle(i18next));
}
