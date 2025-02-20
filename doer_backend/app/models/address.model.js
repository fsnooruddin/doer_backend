module.exports = (sequelize, Sequelize) => {
	const Address = sequelize.define("address", {
		address_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			onDelete: "CASCADE",
		},
		type: {
			type: Sequelize.ENUM("home", "office", "gym", "lake_house", "other"),
			allowNull: false,
		},
		street: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		state: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		country: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		zipCode: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Address;
};
