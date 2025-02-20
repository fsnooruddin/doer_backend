module.exports = (sequelize, Sequelize) => {
	const Review = sequelize.define("review", {
		review_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		text: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
	return Review;
};
