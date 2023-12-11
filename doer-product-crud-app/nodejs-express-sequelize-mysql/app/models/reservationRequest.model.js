const Tutorial = require ("./tutorial.model.js");

module.exports = (sequelize, Sequelize) => {
  const ReservationRequest = sequelize.define("reservationRequest", {
    request_date_time: {
      type: Sequelize.STRING
    },
    request_services: {
      type: Sequelize.STRING
    },
    published: {
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

