
module.exports = (sequelize, Sequelize) => {
  const ReservationRequest = sequelize.define("reservationRequest", {
    requested_services: {
      type: Sequelize.STRING
    },
    requested_time: {
          type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    }
  } , {
    tableName: 'reservation_requests'
  }
  );
  tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
  console.log(tutorials);
  ReservationRequest.belongsTo(tutorials);
  return ReservationRequest;
};

