module.exports = (sequelize, Sequelize) => {
    const Doer = sequelize.define("job_request", {
        job_request_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        services: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Doer;
};