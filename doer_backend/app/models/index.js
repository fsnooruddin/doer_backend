const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.doers = require("./doer.model.js")(sequelize, Sequelize);
db.job_requests = require("./job_request.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);

const AcceptedJob = sequelize.define("accepted_job", {
  accepted_job_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  doer_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.doers,
      key: "doer_id",
    },
  },
  job_request_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.job_requests,
      key: "job_request_id",
    },
  },
});

const StartedJob = sequelize.define("started_job", {
  started_job_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  doer_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.doers,
      key: "doer_id",
    },
  },
  job_request_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.job_requests,
      key: "job_request_id",
    },
  },
   start_time: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
      allowNull: false,
    },
});

const CompletedJob = sequelize.define("completed_job", {
  completed_job_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  doer_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.doers,
      key: "doer_id",
    },
  },
  job_request_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: db.job_requests,
      key: "job_request_id",
    },
  },
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: Sequelize.DataTypes.FLOAT,
    allowNull: false,
  },
  cost: {
    type: Sequelize.DataTypes.FLOAT,
    allowNull: false,
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
  },
  job_request_id: {
    type: Sequelize.DataTypes.INTEGER,

    allowNull: false,
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
});

const DoerTripLocationUpdate = sequelize.define("doer_trip_location_update", {
  doer_trip_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: DoerTrip,
      key: "doer_trip_id",
    },
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
    references: {
      model: db.doers,
      key: "doer_id",
    },
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

/*
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
    			model: db.job_requests,
    			key: "job_id",
    		},
    	},
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
	job_location: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	total_cost: {
    		type: Sequelize.INTEGER,
    		allowNull: false,
    },
});
*/

db.accepted_jobs = AcceptedJob;
db.started_jobs = StartedJob;
db.completed_jobs = CompletedJob;
db.doer_trips = DoerTrip;
db.doer_trip_location_updates = DoerTripLocationUpdate;
db.reviews = Review;

module.exports = db;
