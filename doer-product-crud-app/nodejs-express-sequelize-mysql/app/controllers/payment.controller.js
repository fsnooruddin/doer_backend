const db = require("../models");
const utils = require("../utils/Utils.js");
const Payment = db.payments;
const Op = db.Sequelize.Op;

// Create and Save a new payment
exports.create = (req, res) => {

    console.log("req body in create payment: ");
    console.log(req.body);

    // Create a payment
    const payment = {
        invoice_id: req.body.invoice_id,
        total_amount: req.body.total_amount,
        ccard_id: req.body.ccard_id
    };

    console.log("new payment in create payment: ");
    console.log(payment);

    // Save payment in the database
    Payment.create(payment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the payment."
            });
        });
};

// Find a single payment with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    console.log("payment-controller findOne. id = " + id);

    Payment.findAll({
            where: {
                payment_id: id
            }
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find payment with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving payment with id=" + id
            });
        });
};

// Find a single payment with an id
exports.findAll = (req, res) => {

    console.log("payment-controller findAll..");
    Payment.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find payment in findAll`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving payment in findAll"
            });
        });
};