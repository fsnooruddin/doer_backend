module.exports = (sequelize, Sequelize) => {
    const Doer = sequelize.define("doer", {
        doer_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        services: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Doer;
};