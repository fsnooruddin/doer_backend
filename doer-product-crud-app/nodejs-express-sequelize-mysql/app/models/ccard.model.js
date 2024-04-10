module.exports = (sequelize, Sequelize) => {
    const CCard = sequelize.define("ccard", {
        ccard_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cardholder_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING
        },
        provider: {
            type: Sequelize.STRING
        },
        expiry: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'credit_cards'
    });


    users = require("./user.model.js")(sequelize, Sequelize);
    CCard.hasOne(users, {
        foreignKey: 'ccard_id'
    });

    return CCard;
};