module.exports = (sequelize, Sequelize) => {
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
			//		references: {
			//			model: doers,
			//			key: "doer_id",
			//		},
		},
		job_id: {
			type: Sequelize.Sequelize.INTEGER,
			allowNull: false,
			//	references: {
			//		model: jobs,
			//		key: "job_id",
			//	},
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

	return DoerTrip;
};
