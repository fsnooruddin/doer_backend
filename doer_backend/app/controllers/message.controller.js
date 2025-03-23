"use strict";

/**
 * @namespace Message
 */
const db = require("../models");
const Utils = require("../utils/Utils.js");
const Message = db.messages;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");

/**
 * Create a new message
 *
 * {
 *    job_id: "1",
 *    doer_id: "1",
 *    user_id: "1",
 *    message: "Best job Ever"
 *  }
 *
 * @memberof Message
 */
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

		logger.info("Success creating message: " + JSON.stringify(new_message));
		res.status(200).send(new_message);
		return;
	} catch (err) {
		logger.error("Error creating message with message data =" + req.body + " error: " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the message.",
		});
	}
}

/**
 * Find a single message with an id
 *
 * @param {number} id - Id of message to retreive
 *
 * @memberof Message
 */
async function findById(req, res) {
	const id = req.query.id;
	if (Utils.validateIntegerParam("Message Id", id) == false) {
		logger.error("Error retrieving messages by ID, message Id is missing");
		res.status(400).send({
			message: "Error retrieving messages by id, message Id is missing",
		});

		return;
	}
	logger.info("message-controller findById message id = " + id);

	try {
		const data = await Message.findOne({
			where: { message_id: id },
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		if (data == null) {
			logger.warn("data from findById message is = null , message id = " + id);
			res.status(400).send("Couldn't find message");
			return;
		}

		logger.info("message-controller findById -- message id is " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error retrieving message with message id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error retrieving message with id=" + id + " error: " + err.message,
		});
		return;
	}
}

/**
 * Find all messages related to a job
 * @param {number} jobId - Id of Job for which to get messages
 * @memberof Message
 */
async function findByJobId(req, res) {
	const id = req.query.jobId;

	if (Utils.validateIntegerParam("Job Id", id) == false) {
		logger.error("Error retrieving messages by JobId, Job Id is missing or not integer");
		res.status(400).send({
			message: "Error retrieving messages by JobId, Job Id is missing or not integer",
		});

		return;
	}
	logger.info("message-controller findByJobId job id = " + id);

	try {
		const data = await Message.findAll({
			where: { job_id: id },
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		if (data == null) {
			logger.warn("data from find message for job is = null , job id = " + id);
			res.status(400).send("Couldn't find messages for job");
			return;
		}

		logger.info("message-controller findByJobId -- job id is " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error retrieving message with job id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error retrieving message with job id=" + id + " error: " + err.message,
		});
		return;
	}
}

module.exports = {
	create,
	findById,
	findByJobId,
};
