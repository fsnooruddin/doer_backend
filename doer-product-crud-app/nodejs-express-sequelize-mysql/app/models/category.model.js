module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        category_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parent_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time_to_complete: {
            type: Sequelize.STRING
        },
        price_range: {
            type: Sequelize.STRING
        },
        img_url: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categories'
    });

    return Category;
};