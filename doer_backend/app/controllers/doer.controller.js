const db = require("../models");
const utils = require("../utils/Utils.js");
const Doer = db.doers;
const AcceptedJobs = db.accepted_jobs;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require('../schemas/doer.js');
const Joi = require('joi');

// Create and Save a new Doer
exports.create = (req, res) => {

    console.log("req body in create doer: ");
    console.log(req.body);

    const data_obj = JSON.parse(utils.escapeJSONString(JSON.stringify(req.body)));
    const validation = doerCreateSchema.validate(data_obj);

    if(validation.error === undefined) {
        console.log("doer schema validation succeeded");
    } else {
        console.log("\t doer schema validation failed");
        console.log(validation.error.details[0].message);
        res.status(400).send({
                    message: "input data failed doer scheme validation: " + validation.error.details[0].message
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

    console.log("new doer in create doer: ");
    console.log(doer);

    // Save doer in the database
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
    Doer.findAll(
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

// Retrieve all Users from the database
// or only those whose title  matches
exports.acceptJob = (req, res) => {

    console.log("Doer-controller acceptJob");
    const doerId = req.query.doerId;
    const jobReqId = req.query.jobId;

 // Create a doer
    const accepted_job = {
        doer_id: doerId,
        job_request_id: jobReqId
    };

      // Save doer in the database
        AcceptedJobs.create(accepted_job)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while accepting the job."
                });
            });

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

