module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        booking_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        doer_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        booking_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        booking_date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        booking_time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        job_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        type_of_booking: {
            type: Sequelize.STRING,
            allowNull: false
        },
        invoice_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        req_period: {
            type: Sequelize.STRING,
            allowNull: false
        },
        start_time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        end_time: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });

    return Booking;
};