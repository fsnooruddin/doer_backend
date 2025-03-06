"use strict";

/**
 * @namespace User
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const User = db.users;
const Job = db.job_requests;
const Address = db.addresses;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");

/**
 * Create a User
 * @param {object} user - JSON representing User
 * @param {string} user.name - Name of User
 * @param {string} user.phone_number - Phone number of User
 * @param {string} user.addresses - Address of user, e.g.
 * ```
 * { type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
 * ```
 * @param {string} user.img_url - URL for User
 * @return {string|null} error string - null if success, error details if failure
 * @example
 * Sample Payload:
 * {
 *      "name": "Susie User",
 *        "phone_number": "5101329077",
 *        "img_url": "profile.pic",
 *        addresses: [
 *       		{ type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
 *        		{ type: "office", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" },
 *       	],
 *    }
 * @memberof User
 */
async function create(req, res) {
	if (Object.keys(req.body).length === 0) {
		logger.error("user-controller create call missing payload: " + JSON.stringify(req.body));
		res.status(400).send({ message: "Error creating User, data is missing" });
		return;
	}

	try {
		// Save user in the database
		const response_data = await User.create(req.body, { include: ["addresses"] });
		res.status(200).send(response_data);
		return;
	} catch (err) {
		logger.error("user-controller create call failed. error = " + err.message);
		res.status(500).send({ message: "user-controller create call failed. error = " + err.message });
		return;
	}
}

/**
 * Find a single User with an id
 * @param {number} id - User Id of user to retreive
 * @return {string|null} User - null if failure, JSON object representing User if success
 * @memberof User
 */
async function findById(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("user-controller findById missing userId");
		res.status(500).send({
			message: "Error retrieving User Id is missing",
		});

		return;
	}

	logger.info("User-controller findOne id = " + id);
	const data = await User.findByPk(id, { include: [{ association: "addresses" }, { association: "badges" }] });

	if (data == null) {
		logger.error("user-controller findById couldn't find user with userId " + id);
		res.status(500).send({
			message: "Error retrieving User with id=" + id,
		});
	} else {
		logger.info("user-controller findById,  userId " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	}
}

/**
 * Get all addresses for a user
 * @param {number} id - User Id of user
 * @return {string|null} User - null if failure, JSON object representing addresses if success
 * @memberof User
 */
async function getAddresses(req, res) {
	const id = req.query.userId;

	if (Utils.validateIntegerParam("user Id", id) == false) {
		logger.error("address_request-controller accept address missing user Id or user id is not integer: " + userId);
		res.status(400).send({ message: "Error accepting address - user Id is missing or not integer" });
		return;
	}

	logger.info("address_request-controller getAddressesForUser, userId = " + id);

	const user = await User.findByPk(id); // Retrieve a user
	const data = await user.getAddresses();
	logger.info("user-controller getAddresses,  userId " + id + " returning " + JSON.stringify(data));
	res.status(200).send(data);
}

/**
 * Get the history for a User. Includes completed, accepted jobs as well as invoices received
 * @param {number} id - ID of User for which we are fetching history
 *
 * @return {string|null} User - null if failure, JSON object representing addresses if success
 * @memberof User
 */
async function getJobHistory(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("user-controller findById missing userId");
		res.status(500).send({
			message: "Error retrieving User Id is missing",
		});

		return;
	}

	logger.info("User-controller findOne id = " + id);
	const data = await User.findByPk(id, { include: [{ association: "addresses" }, { association: "badges" }] });

	if (data == null) {
		logger.error("user-controller findById couldn't find user with userId " + id);
		res.status(500).send({
			message: "Error retrieving User with id=" + id,
		});
	} else {
		logger.info("user-controller findById,  userId " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	}
}

module.exports = {
	create,
	findById,
	getAddresses,
	getJobHistory,
};
