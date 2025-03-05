module.exports = (sequelize, Sequelize) => {
	const Job = sequelize.define("job", {
		job_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		latitude: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		longitude: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		day: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		req_time: {
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

	return Job;
};
