module.exports = (sequelize, Sequelize) => {
	const Message = sequelize.define("message", {
		message_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		job_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
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

	return Message;
};
