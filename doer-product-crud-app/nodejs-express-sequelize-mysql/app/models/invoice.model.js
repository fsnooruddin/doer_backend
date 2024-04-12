module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoice", {
        invoice_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        rate: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        job_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    });

    return Invoice;
};
