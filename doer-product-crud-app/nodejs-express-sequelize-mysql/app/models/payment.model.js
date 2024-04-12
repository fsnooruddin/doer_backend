module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        payment_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invoice_ids: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        total_amount: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        ccard_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        }
    });

    return Payment;
};