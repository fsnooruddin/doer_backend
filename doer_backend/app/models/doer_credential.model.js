module.exports = (sequelize, Sequelize) => {
	const DoerCredential = sequelize.define("doer_credentials", {
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
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
	});
	return DoerCredential;
};
