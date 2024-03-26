module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("user", {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
         type: Sequelize.STRING,
         allowNull: false
      },
      phone_number: {
         type: Sequelize.STRING,
         allowNull: false
      },
      address: {
         type: Sequelize.STRING,
         allowNull: false
      },
      rating: {
         type: Sequelize.INTEGER
      },
     current_location: {
         type: Sequelize.STRING,
         allowNull: true
      }
    }
   );

   return User;
};
