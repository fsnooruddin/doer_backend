const db = require("../models");
const utils = require("../utils/Utils.js");
const Invoice = db.invoices;
const Op = db.Sequelize.Op;

// Create and Save a new invoice
exports.create = (req, res) => {

    console.log("req body in create invoice: ");
    console.log(req.body);

    // Create a invoice
    const invoice = {
        task_id: req.body.task_id,
        rate: req.body.rate,
        job_id: req.body.job_id,
        amount: req.body.amount
    };

    console.log("new invoice in create invoice: ");
    console.log(invoice);

    // Save invoice in the database
    Invoice.create(invoice)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the invoice."
            });
        });
};

// Find a single invoice with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    console.log("invoice-controller findOne. id = " + id);

    Invoice.findAll({
            where: {
                invoice_id: id
            }
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find invoice with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving invoice with id=" + id
            });
        });
};

// Find a single invoice with an id
exports.findAll = (req, res) => {

    console.log("invoice-controller findAll..");
    Invoice.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find invoice in findAll`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving invoice in findAll"
            });
        });
};