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
db.users = require("./user.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.otps = require("./otp.model.js")(sequelize, Sequelize);
db.badges = require("./badge.model.js")(sequelize, Sequelize);

const UserBadge = sequelize.define("UserBadge", {
	user_id: {
		type: Sequelize.INTEGER,
		references: {
			model: db.users,
			key: "user_id",
		},
	},
	badge_id: {
		type: Sequelize.INTEGER,
		references: {
			model: db.badges,
			key: "badge_id",
		},
	},
});

// Address Model
const Address = sequelize.define("address", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: { model: db.users, key: "user_id" },
		onDelete: "CASCADE",
	},
	type: {
		type: Sequelize.ENUM("home", "office", "lake_house", "other"),
		allowNull: false,
	},
	street: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	state: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	zipCode: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

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
		references: {
			model: db.users,
			key: "user_id",
		},
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
		type: Sequelize.Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	doer_id: {
		type: Sequelize.Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: db.doers,
			key: "doer_id",
		},
	},
	job_id: {
		type: Sequelize.Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Job,
			key: "job_id",
		},
	},
	description: {
		type: Sequelize.Sequelize.STRING,
		allowNull: true,
	},
	address: {
		type: Sequelize.Sequelize.STRING,
		allowNull: false,
	},
	eta: {
		type: Sequelize.Sequelize.STRING,
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
		type: Sequelize.Sequelize.INTEGER,
		allowNull: false,
	},
	location_update: {
		type: Sequelize.Sequelize.JSONB,
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

db.users.hasMany(Address, { foreignKey: "user_id", as: "addresses" });
Address.belongsTo(db.users, { foreignKey: "user_id", as: "user" });

db.jobs = Job;
db.job_histories = JobHistory;
db.doer_trips = DoerTrip;
db.doer_trip_location_updates = DoerTripLocationUpdate;
db.reviews = Review;
db.invoices = Invoice;
db.messages = Message;
db.addresses = Address;

module.exports = db;
