module.exports = (sequelize, Sequelize) => {
    const JobNote = sequelize.define("jobNote", {
        doer_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        reservation_id: {
            type: Sequelize.INTEGER
        },
        note_text: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'job_notes'
    });

    return JobNote;
};