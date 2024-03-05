module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    address_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
          type: Sequelize.STRING,
          allowNull: false
    },
    address2: {
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
    }
  } , {
    tableName: 'addresses'
  }
  );

  return Address;
};

