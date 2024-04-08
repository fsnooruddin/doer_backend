module.exports = (sequelize, Sequelize) => {
   const Doer = sequelize.define("doer", {
    doer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
         type: Sequelize.STRING,
         allowNull: false
      },
      service_ids: {
         type: Sequelize.STRING,
         allowNull: false
      },
      certification_ids: {
         type: Sequelize.STRING,
         allowNull: false
      },
      introduction: {
         type: Sequelize.STRING,
         allowNull: false
      },
      availability_ids: {
         type: Sequelize.STRING,
         allowNull: false
      }
   });

   return Doer;
};
