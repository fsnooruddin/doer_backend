module.exports = (sequelize, Sequelize) => {
	const DoerBadgeAssociation = sequelize.define(
		"doer_badge_association",
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
	return DoerBadgeAssociation;
};
