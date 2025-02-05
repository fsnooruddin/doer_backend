"use strict";

const db = require("../models");
const utils = require("../utils/Utils.js");
const Message = db.messages;
const Op = db.Sequelize.Op;
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");
const logger = require("../utils/Logger.js");

// Create and Save a new Message
function create(req, res) {
	console.log("req body in create message: ");
	console.log(req.body);

	const data_obj = JSON.parse(utils.escapeJSONString(JSON.stringify(req.body)));

	/*
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

	console.log("new message in create message: ");
	console.log(data_obj);

	// Save message in the database
	Message.create(data_obj)
		.then((data) => {
			logger.info("Success creating message with message data =" + req.body);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error creating message with message data =" + req.body + " error: " + err.message);
			res.status(500).send({
				message: err.message || "Some error occurred while creating the message.",
			});
		});
}

// Find a single message with an id
function findById(req, res) {
	const id = req.query.id;
	if (id == null) {
		logger.error("Error retrieving messages by ID, message Id is missing");
		res.status(500).send({
			message: "Error retrieving messages by id, message Id is missing",
		});

		return;
	}
	logger.info("message-controller findById message id = " + id);
	console.log(typeof id);
	console.log(parseInt(id));

	if (isNaN(parseInt(id))) {
		logger.error("Error retrieving messages by ID, message Id is not integer, id = " + id);
		res.status(500).send({
			message: "Error retrieving messages by id, message Id is not integer",
		});

		return;
	}

	Message.findOne({
		where: {
			message_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("message-controller findById -- message id is " + id + " returning " + data);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error retrieving message with message id=" + id + " error: " + err.message);
			res.status(500).send({
				message: "Error retrieving message with id=" + id + " error: " + err.message,
			});
		});
}

// Find  messages for a doer
function findByJobId(req, res) {
	const id = req.query.jobId;

	if (id == null) {
		logger.error("Error retrieving messages by JobId, Job Id is missing");
		res.status(500).send({
			message: "Error retrieving messages by JobId, Job Id is missing",
		});

		return;
	}
	logger.info("message-controller findByJobId job id = " + id);

	if (isNaN(parseInt(id))) {
		logger.error("Error retrieving messages by job ID, doer Id is not integer");
		res.status(500).send({
			message: "Error retrieving messages by job id, doer Id is not integer",
		});

		return;
	}

	Message.findAll({
		where: {
			job_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("message-controller findByJobId -- job id is " + id + " returning " + data);
			res.status(200).send(data);
			return;
		})
		.catch((err) => {
			logger.error("Error retrieving message with job id=" + id + " error: " + err.message);
			res.status(500).send({
				message: "Error retrieving message with job id=" + id + " error: " + err.message,
			});
			return;
		});
}

module.exports = {
	create,
	findById,
	findByJobId,
};
