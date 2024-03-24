module.exports = (sequelize, Sequelize) => {
   const Doer = sequelize.define("doer", {
    doer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
         type: Sequelize.STRING,
         allowNull: false
      },
      services: {
         type: Sequelize.STRING,
         allowNull: false
      },
      availability: {
         type: Sequelize.STRING,
         allowNull: false
      },
      phone_number: {
         type: Sequelize.STRING,
         allowNull: false
      },
      location: {
         type: Sequelize.STRING,
         allowNull: false
      },
      rating: {
         type: Sequelize.INTEGER
      },
      review_count: {
         type: Sequelize.INTEGER
      },
     current_location: {
         type: Sequelize.STRING,
         allowNull: true
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
