module.exports = (sequelize, Sequelize) => {
  const Doer = sequelize.define("doer", {
    name: {
      type: Sequelize.STRING
    },
    services: {
      type: Sequelize.STRING
    },
    availability: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER
    }
  });

  return Doer;
};
