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
    },
   accepted_reservations_count: {
       type: Sequelize.INTEGER,
       allowNull: false,
       defaultValue: 0
    },
   declined_reservations_count: {
       type: Sequelize.INTEGER,
       allowNull: false,
       defaultValue: 0
    },
   abandoned_reservations_count: {
       type: Sequelize.INTEGER,
       allowNull: false,
       defaultValue: 0
        },
     completed_reservations_count: {
           type: Sequelize.INTEGER,
           allowNull: false,
           defaultValue: 0
            }
  });

  return Doer;
};
