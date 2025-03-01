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
		total: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		count: {
        			type: Sequelize.INTEGER,
        			allowNull: false,
        		}
	});

	return Rating;
};
