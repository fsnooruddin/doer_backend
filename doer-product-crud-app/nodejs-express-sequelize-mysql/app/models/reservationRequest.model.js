
module.exports = (sequelize, Sequelize) => {
  const ReservationRequest = sequelize.define("reservationRequest", {
    requested_services: {
      type: Sequelize.STRING
    },
    requested_time: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.ENUM,
      values: [
              'Requested',
              'SentToDoer',
              'Accepted',
              'Declined',
              'Completed',
              'Abandoned',
              'Recalled'
      ],
      defaultValue: 'Requested',
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
  } , {
    tableName: 'reservation_requests'
  }
  );
  doers = require("./doer.model.js")(sequelize, Sequelize);

  ReservationRequest.belongsTo(doers, { foreignKey: 'doer_id' });
  return ReservationRequest;
};

