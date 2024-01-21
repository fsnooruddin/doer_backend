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
    },
    review_count: {
      type: Sequelize.INTEGER
    },
    phone_number: {
      type: Sequelize.STRING
    },
    location: {
       type: Sequelize.STRING
    },
    img_url: {
      type: Sequelize.STRING
    }
  });

  return Doer;
};
