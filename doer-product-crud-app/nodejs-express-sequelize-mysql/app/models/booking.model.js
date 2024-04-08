module.exports = (sequelize, Sequelize) => {
   const Booking = sequelize.define("booking", {
    booking_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
         type: Sequelize.STRING,
         allowNull: false
      },
      doer_id: {
         type: Sequelize.STRING,
         allowNull: false
      },
      booking_type: {
         type: Sequelize.STRING,
         allowNull: false
      },
      booking_timeslot_id: {
         type: Sequelize.STRING,
         allowNull: false
      },
      job_id: {
         type: Sequelize.STRING,
         allowNull: false
      },
           invoice_id: {
               type: Sequelize.STRING,
               allowNull: false
            },
                 status: {
                     type: Sequelize.STRING,
                     allowNull: false
                  },
                       address_id: {
                           type: Sequelize.STRING,
                           allowNull: false
                        }
   });

   return Booking;
};
