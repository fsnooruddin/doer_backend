"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Message = db.messages;
const Op = db.Sequelize.Op;
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");
const logger = require("../utils/Logger.js");

// Create and Save a new Message
async function create(req, res) {
	if (Object.keys(req.body).length === 0) {
		logger.error("message-controller create ... body null = " + JSON.stringify(req.body));
		res.status(400).send("Error creating message, request body is null.");
		return;
	}
	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	logger.info("new message in create message: " + JSON.stringify(req.body));

	// Save message in the database
	try {
		var new_message = await Message.create(data_obj);

		logger.info("Success creating message");
		res.status(200).send(new_message);
		return;
	} catch (err) {
		logger.error("Error creating message with message data =" + req.body + " error: " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the message.",
		});
	}
}

// Find a single message with an id
function findById(req, res) {
	const id = req.query.id;
	if (Utils.validateIntegerParam("Message Id", id) == false) {
		logger.error("Error retrieving messages by ID, message Id is missing");
		res.status(400).send({
			message: "Error retrieving messages by id, message Id is missing",
		});

		return;
	}
	logger.info("message-controller findById message id = " + id);

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

	if (Utils.validateIntegerParam("Job Id", id) == false) {
		logger.error("Error retrieving messages by JobId, Job Id is missing or not integer");
		res.status(400).send({
			message: "Error retrieving messages by JobId, Job Id is missing or not integer",
		});

		return;
	}
	logger.info("message-controller findByJobId job id = " + id);

	Message.findAll({
		where: {
			job_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("message-controller findByJobId -- job id is " + id + " returning " + JSON.stringify(data));
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
