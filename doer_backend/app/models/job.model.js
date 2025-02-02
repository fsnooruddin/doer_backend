module.exports = (sequelize, Sequelize) => {
	const Job = sequelize.define('job', {
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
			defaultValue: -1,
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
			type: Sequelize.ENUM('requested', 'accepted', 'rejected', 'in-progress', 'completed'),
			allowNull: false,
			defaultValue: 'requested'
		}
	})

	return Job
}
