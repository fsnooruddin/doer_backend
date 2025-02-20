module.exports = (sequelize, Sequelize) => {
	const Invoice = sequelize.define("invoice", {
		invoice_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		doer_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		job_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		cost: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		duration: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		location: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Invoice;
};
