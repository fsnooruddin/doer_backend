const db = require("../models");
const utils = require("../utils/Utils.js");
const Doer = db.doers;
const Op = db.Sequelize.Op;
const { schema } = require('../schemas/doer.js');
const Joi = require('joi');

// Create and Save a new Doer
exports.create = (req, res) => {

    console.log("req body in create doer: ");
    console.log(req.body);

    // Validate request
    if (!req.body.full_name) {
        res.status(400).send({
            message: "name can not be empty in create doer!"
        });
        return;
    }

    // Create a doer
    const doer = {
        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        address: req.body.address,
        services: req.body.services
    };

    console.log("new user in create doer: ");
    console.log(doer);


    // Save User in the database
    Doer.create(doer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the doer."
            });
        });
};

// Find a single Doer with an id
exports.findById = (req, res) => {
    const id = req.query.id;
    console.log("Doer-controller findOne id = " + id);
    Doer.findOne(
        {
            where: {
                doer_id: id
        },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })
        .then(data => {
             res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Doer with id=" + id + " error: " + err.message
            });
        });
};

// Find a single Doer by services
exports.findByServices = (req, res) => {
    const services = req.query.services;
    console.log("Doer-controller findOne services = " + services);
    Doer.findOne(
        {
            where: {
                services: {
                     [Op.like]: services
                }
        },
            attributes: {
                exclude: ['updatedAt', 'createdAt']
            }
        })
        .then(data => {
             res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Doer with id=" + id + " error: " + err.message
            });
        });
};

// Retrieve all Users from the database
// or only those whose title  matches
exports.findAll = (req, res) => {

    console.log("Doer-controller findAll");


};

/*
exports.validateUserData = (data) => {

    console.log("Validating data: " + JSON.stringify(data));

    const data_obj = JSON.parse(utils.escapeReturnString(JSON.stringify(data)));
    console.log("Validating data: " + data_obj);
    console.log("Validating data: " + typeof data_obj);
    const validation = schema.validate(data_obj);
  
    if(validation.error === undefined) {
        console.log("user schema validation succeeded");
        return null;
    } else {
        console.log("\t user schema validation failed");
        validation.error.details.forEach(element => {
            console.log("\treason: " + element.message + "\n");
        });
        validation_error = validation.error.details[0].message;
        console.log(validation.error.details[0].message);
        return validation.error.details[0].message;
    }

};
*/

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
    console.log("User-controller findOne id = " + id);

};

