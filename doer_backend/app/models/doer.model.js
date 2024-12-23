module.exports = (sequelize, Sequelize) => {
	const Doer = sequelize.define("doer", {
		doer_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		services: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		availability: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		rating: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		rate: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		img_url: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	return Doer;
};
