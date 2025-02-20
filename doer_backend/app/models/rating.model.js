module.exports = (sequelize, Sequelize) => {
	const Rating = sequelize.define("rating", {
		rating_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		rating_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		rating_value: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		rating_value: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
	});

	return Rating;
};
