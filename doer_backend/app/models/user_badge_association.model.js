module.exports = (sequelize, Sequelize) => {
	const UserBadgeAssociation = sequelize.define(
		"user_badge_association",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
	return UserBadgeAssociation;
};
