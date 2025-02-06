const dbConfig = require("../config/db.config.js");
const logger = require("../utils/Logger.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	logging: (query, options) => {
		logger.info(`${query} [${options.modelName}]`);
	},
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.doers = require("./doer.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);

const Job = sequelize.define("job", {
	job_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	doer_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: db.doers,
			key: "doer_id",
		},
	},
	time: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	services: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.ENUM("requested", "accepted", "rejected", "in-progress", "completed"),
		allowNull: false,
		defaultValue: "requested",
	},
});

const DoerTrip = sequelize.define("doer_trip", {
	doer_trip_id: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	doer_id: {
		type: Sequelize.DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: db.doers,
			key: "doer_id",
		},
	},
	job_id: {
		type: Sequelize.DataTypes.INTEGER,

		allowNull: false,
		references: {
			model: Job,
			key: "job_id",
		},
	},
	description: {
		type: Sequelize.DataTypes.STRING,
		allowNull: true,
	},
	address: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	eta: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	status: {
    		type: Sequelize.ENUM("started", "completed"),
    		allowNull: false,
    		defaultValue: "started",
    	},
});

const DoerTripLocationUpdate = sequelize.define("doer_trip_location_update", {
	doer_trip_id: {
		type: Sequelize.DataTypes.INTEGER,
	},
	location_update: {
		type: Sequelize.DataTypes.JSONB,
		allowNull: false,
	},
});

const Review = sequelize.define("review", {
	review_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	doer_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	text: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

const Rating = sequelize.define("rating", {
	rating_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	doer_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	rating_count: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	rating_value: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	rating_value: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
});

const Invoice = sequelize.define("invoice", {
	invoice_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	doer_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: db.doers,
			key: "doer_id",
		},
	},
	job_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Job,
			key: "job_id",
		},
	},
	cost: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	duration: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

const JobHistory = sequelize.define("job_history", {
	job_history_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	job_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	changed_by: {
		type: Sequelize.ENUM("doer", "user", "admin"),
		allowNull: false,
	},
	changed_by_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	change_field: {
		type: Sequelize.ENUM("status", "time", "location", "duration"),
		allowNull: false,
	},
	change_value: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

const Message = sequelize.define("message", {
	message_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	doer_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: db.doers,
			key: "doer_id",
		},
	},
	job_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Job,
			key: "job_id",
		},
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	message: {
		type: Sequelize.STRING(2048),
		allowNull: false,
	},
});

db.jobs = Job;
db.job_histories = JobHistory;
db.doer_trips = DoerTrip;
db.doer_trip_location_updates = DoerTripLocationUpdate;
db.reviews = Review;
db.invoices = Invoice;
db.messages = Message;

module.exports = db;
