module.exports = (sequelize, Sequelize) => {
    const Certificate = sequelize.define("certificate", {
        certificate_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        provider: {
            type: Sequelize.STRING,
            allowNull: false
        },
        task_ids: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        level: {
            type: Sequelize.STRING,
            allowNull: false
        },
        issue_date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiry_date: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    doers = require("./doer.model.js")(sequelize, Sequelize);
    Certificate.hasOne(doers, {
        foreignKey: 'certificate_id'
    });

    return Certificate;
};