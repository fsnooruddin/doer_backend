
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
  doers = require("./doer.model.js")(sequelize, Sequelize);

  ReservationRequest.belongsTo(doers);
  return ReservationRequest;
};

