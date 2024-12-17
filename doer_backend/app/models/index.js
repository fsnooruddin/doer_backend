const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.doers = require("./doer.model.js")(sequelize, Sequelize);
db.job_requests = require("./job_request.model.js")(sequelize, Sequelize);

const AcceptedJob = sequelize.define('accepted_job', {
  doer_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.doers,
      key: 'doer_id',
    },
  },
  job_request_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.job_requests,
      key: 'job_request_id',
    },
  },
});

const CompletedJob = sequelize.define('completed_job', {
  doer_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.doers,
      key: 'doer_id',
    },
  },
  job_request_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.job_requests,
      key: 'job_request_id',
    },
  },
});

db.accepted_jobs = AcceptedJob;
db.completed_jobs = CompletedJob;

module.exports = db;
