module.exports = (sequelize, Sequelize) => {
    const JobRequest = sequelize.define("job_request", {
        job_request_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        services: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
             type: Sequelize.DataTypes.ENUM,
             values: ['requested', 'accepted','completed'],
             allowNull: false,
             defaultValue: 'requested'
        }
    });

    return JobRequest;
};