const db = require("../models");
const utils = require("../utils/Utils.js");
const CCard = db.ccards;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("req body in create ccard: ");
    console.log(req.body);


    // Create a Doer
    const ccard = {
        ccard_id: req.body.ccard_id,
        cardholder_name: req.body.cardholder_name,
        number: req.body.number,
        type: req.body.type,
        provider: req.body.provider,
        expiry: req.body.expiry
    };

    console.log("new ccard in create ccard: ");
    console.log(ccard);
    console.log(CCard);


    // Save Doer in the database
    CCard.create(ccard)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ccard."
            });
        });
};

// Find a single CCard with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    console.log("CCard-controller findOne. id = " + id);

    CCard.findAll({
            where: {
                ccard_id: id
            }
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find CCard with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving CCard with id=" + id
            });
        });
};

// Find a single CCard with an id
exports.findAll = (req, res) => {

    console.log("CCard-controller findAll..");
    CCard.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find CCard in findAll`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving CCard in findAll"
            });
        });
};