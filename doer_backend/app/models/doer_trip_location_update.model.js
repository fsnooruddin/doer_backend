module.exports = (sequelize, Sequelize) => {
	const DoerTripLocationUpdate = sequelize.define("doer_trip_location_update", {
		doer_trip_id: {
			type: Sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
		location_update: {
			type: Sequelize.Sequelize.JSONB,
			allowNull: false,
		},
	});

	return DoerTripLocationUpdate;
};
