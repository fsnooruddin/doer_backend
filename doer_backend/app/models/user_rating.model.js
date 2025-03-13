module.exports = (sequelize, Sequelize) => {
	const UserRating = sequelize.define("user_rating", {
		rating_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
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
		},
	});

	return UserRating;
};
