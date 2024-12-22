module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        category_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
                alias: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                parent_aliases: {
                                    type: Sequelize.STRING,
                                    allowNull: false
                                },

    parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: false
    });

    return Category;
};