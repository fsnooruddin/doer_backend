module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        address_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address_1: {
            type: Sequelize.STRING
        },
        address_2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipcode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        latitude: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    }, {
        tableName: 'addresses'
    });


    users = require("./user.model.js")(sequelize, Sequelize);
    Address.hasOne(users, {
        foreignKey: 'address_id'
    });

    return Address;
};