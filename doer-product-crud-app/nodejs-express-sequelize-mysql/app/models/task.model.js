module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        task_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sub_category: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Task;
};
