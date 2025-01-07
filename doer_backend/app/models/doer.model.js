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
		location: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		services: {
			type: Sequelize.STRING(2048),
			allowNull: false,
		},
		availability: {
			type: Sequelize.STRING(2048),
			allowNull: false,
		},
		rating: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		hourly_rate: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		minimum_charges: {
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

