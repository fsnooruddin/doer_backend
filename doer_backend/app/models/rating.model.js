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
		rating: {
			type: Sequelize.JSON,
			allowNull: false,
		}
	});

	return Rating;
};
