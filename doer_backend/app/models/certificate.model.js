module.exports = (sequelize, Sequelize) => {
	const Certificate = sequelize.define("certificate", {
		certificate_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.TEXT,
		},
		icon_url: {
			type: Sequelize.STRING,
		},
	});
	return Certificate;
};
