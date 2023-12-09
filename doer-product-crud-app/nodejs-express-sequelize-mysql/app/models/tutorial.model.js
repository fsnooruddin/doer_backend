module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    availability: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};
