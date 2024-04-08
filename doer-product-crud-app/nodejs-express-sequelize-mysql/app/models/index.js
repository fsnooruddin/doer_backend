const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.reservationRequests = require("./reservationRequest.model.js")(sequelize, Sequelize);
db.doers = require("./doer.model.js")(sequelize, Sequelize);
db.jobNotes = require("./jobNotes.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.addresses = require("./address.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.ccards = require("./ccard.model.js")(sequelize, Sequelize);
db.bookings = require("./booking.model.js")(sequelize, Sequelize);

module.exports = db;
