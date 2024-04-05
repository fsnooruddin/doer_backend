module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("user", {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
         type: Sequelize.STRING,
         allowNull: false
      },
      phone_number: {
         type: Sequelize.STRING,
         allowNull: false
      },
      address_id: {
         type: Sequelize.INTEGER.UNSIGNED,
         allowNull: false
      },
    ccard_id: {
       type: Sequelize.INTEGER.UNSIGNED,
       allowNull: false
    },
      date_of_birth: {
         type: Sequelize.DATE
      },
     gender: {
         type: Sequelize.STRING,
         allowNull: true
      }
    }
   );

   return User;
};
