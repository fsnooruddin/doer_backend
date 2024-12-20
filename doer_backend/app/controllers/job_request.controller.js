"use strict";

const db = require("../models");
const utils = require("../utils/Utils.js");
const JobRequest = db.job_requests;
const Doer = db.doers;
const Op = db.Sequelize.Op;
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");

// Create and Save a new Job Request
exports.create = (req, res) => {
	console.log("req body in create job_request: ");
	console.log(req.body);

	/*
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
*/

	// Create a doer
	const job_request = {
		user_id: req.body.user_id,
		time: req.body.time,
		location: req.body.location,
		services: req.body.services,
	};

	console.log("new job_request in create job_request: ");
	console.log(job_request);

	// Save doer in the database
	JobRequest.create(job_request)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the job_request.",
			});
		});
};

// Find a single job_request with an id
exports.findById = (req, res) => {
	const id = req.query.id;
	console.log("job_request-controller findOne id = " + id);
	JobRequest.findOne({
		where: {
			job_request_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error retrieving job_request with id=" +
					id +
					" error: " +
					err.message,
			});
		});
};

// Find a single Doer by services
exports.findByServices = (req, res) => {
	const services = req.query.services;
	console.log("job_request-controller findOne services = " + services);
	JobRequest.findAll({
		where: {
			services: {
				[Op.like]: services,
			},
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error retrieving job_request with id=" +
					id +
					" error: " +
					err.message,
			});
		});
};

// Retrieve all Users from the database
// or only those whose title  matches
exports.findAll = (req, res) => {
	console.log("job_request-controller findAll");
};

// Retrieve all Users from the database
// or only those whose title  matches
exports.findEligibleDoers = (req, res) => {
	console.log("job_request-controller findAll");

	const id = req.query.id;
	JobRequest.findOne({
		where: {
			job_request_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			const services = data.services;
			Doer.findAll({
				where: {
					services: {
						[Op.like]: services,
					},
				},
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			})
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.status(500).send({
						message:
							"Can't find any doers for request id " +
							id +
							" error: " +
							err.message,
					});
				});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"findEligibleDoers Error retrieving job_request with id=" +
					id +
					" error: " +
					err.message,
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
