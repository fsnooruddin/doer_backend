module.exports = (sequelize, Sequelize) => {
	const Availability_Slot = sequelize.define("availability_slot", {
		availability_slot_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		day: {
			type: Sequelize.TEXT,
		},
		start_time: {
			type: Sequelize.INTEGER,
		},
		end_time: {
			type: Sequelize.INTEGER,
		},
		latitude: {
			type: Sequelize.FLOAT,
		},
		longitude: {
			type: Sequelize.FLOAT,
		},
		radius: {
			type: Sequelize.FLOAT,
		},
		rate: {
			type: Sequelize.INTEGER,
		},
	});
	return Availability_Slot;
};
