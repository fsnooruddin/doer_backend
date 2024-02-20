module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    address_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
          type: Sequelize.STRING
    },
    address2: {
          type: Sequelize.STRING
    },
    city: {
          type: Sequelize.STRING
    },
    state: {
          type: Sequelize.STRING
    },
    zipcode: {
           type: Sequelize.STRING
    }
  } , {
    tableName: 'addresses'
  }
  );

  return Address;
};

