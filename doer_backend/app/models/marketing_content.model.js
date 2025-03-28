module.exports = (sequelize, Sequelize) => {
	const MarketingContent = sequelize.define("marketing_content", {
		marketing_content_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.TEXT,
		},
		image_name: {
			type: Sequelize.STRING,
		},
		start_date: {
		type: Sequelize.STRING,
		},
		end_date: {
        		type: Sequelize.STRING,
        		},
        			tags: {
                        		type: Sequelize.STRING,
                        		},
	});
	return MarketingContent;
};
