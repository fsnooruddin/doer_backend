module.exports = (sequelize, Sequelize) => {
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

	return JobHistory;
};
