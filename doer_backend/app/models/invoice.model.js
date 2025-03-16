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
		status: {
        			type: Sequelize.ENUM("created", "accepted", "rejected", "in-progress", "completed", "cancelled"),
        			allowNull: false,
        			defaultValue: "created",
        		},
	});

	return Invoice;
};
