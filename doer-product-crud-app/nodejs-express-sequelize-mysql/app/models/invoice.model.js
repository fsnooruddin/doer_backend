module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoice", {
        invoice_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        job_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Invoice;
};
