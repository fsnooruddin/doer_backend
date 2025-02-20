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

module.exports = db;
