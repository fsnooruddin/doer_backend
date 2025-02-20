module.exports = (sequelize, Sequelize) => {
	const OTP = sequelize.define("otp", {
		otp_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		phone_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		otp: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return OTP;
};
