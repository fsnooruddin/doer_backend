const db = require("../models");
const utils = require("../utils/Utils.js");
const Address = db.addresses;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("req body in create address: ");
    console.log(req.body);

    // Create a category
    const address = {
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        address_type: req.body.address_type,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    console.log("new address in create address: ");
    console.log(address);

    // Save category in the database
    Address.create(address)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the address."
            });
        });
};

// Find a single Doer with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    console.log("address-controller findOne. id = " + id);

    Address.findAll({
            where: {
                id: id
            }
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find address with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving address with id=" + id
            });
        });
};

// Find a single Doer with an id
exports.findAll = (req, res) => {

    console.log("address-controller findAll..");
    Address.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find address in findAll`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving address in findAll"
            });
        });
};