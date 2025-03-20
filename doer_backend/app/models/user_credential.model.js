module.exports = (sequelize, Sequelize) => {
	const UserCredential = sequelize.define("user_credentials", {
		username: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		type: {
			type: Sequelize.ENUM("user", "doer", "admin"),
			allowNull: false,
		},
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		}
	});
	return UserCredential;
};
