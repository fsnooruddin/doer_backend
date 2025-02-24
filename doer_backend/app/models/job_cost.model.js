module.exports = (sequelize, Sequelize) => {
	const JobCost = sequelize.define("job_cost", {
		job_cost_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		job_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		cost: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		status: {
			type: Sequelize.ENUM("requested", "accepted", "rejected", "in-progress", "completed"),
			allowNull: false,
			defaultValue: "requested",
		},
	});

	return JobCost;
};

