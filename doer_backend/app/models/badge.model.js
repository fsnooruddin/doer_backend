module.exports = (sequelize, Sequelize) => {
	const Badge = sequelize.define("badge", {
		badge_id: {
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

	return Badge;
};
