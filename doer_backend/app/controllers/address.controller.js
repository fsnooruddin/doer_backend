"use strict";
/**
 * @namespace Address
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Address = db.addresses;
const Op = db.Sequelize.Op;
//const { Address_requestCreateSchema } = require('../schemas/Address_request.js');
const Joi = require("joi");
const logger = require("../utils/Logger.js");

/**
 * Create a Address
 * @param {object} Address - JSON representing Address
 * @param {number} Address.id - Phone number requesting the Address
 * @example
 * Sample payload:
 *
 * {
 *  user_id: "1",
 *     	type: "home",
 *     	street: "123 Main St",
 *     	city: "New York",
 *     	state: "NY",
 *     	country: "USA",
 *      	zipCode: "10001",
 *     };
 *
 * @memberof Address
 */
async function create(req, res) {
	logger.info("address-controller req body in create Address: " + req.body);

	if (Object.keys(req.body).length === 0) {
		logger.error("address-controller, req body is null");
		res.status(400).send("address-controller, req body is null");
		return;
	}

	// Save Address in the database
	Address.create(req.body)
		.then((data) => {
			logger.info("Success creating Address with Address data =" + JSON.stringify(data));
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error creating Address with Address data =" + req.body + " error: " + err.message);
			res.status(500).send("Some error occurred while creating the Address.");
		});
}

/**
 * Remove  a Address
 * @param {number} id - If of address being removed
 * @memberof Address
 */
async function remove(req, res) {
	logger.info(req.body);
	const id = req.query.id;

	if (id == null) {
		logger.error("Error retrieving Addresss by ID, Address Id is missing");
		res.status(500).send({
			Address: "Error retrieving Addresss by id, Address Id is missing",
		});

		return;
	}

	Address.destroy({
		where: {
			address_id: id,
		},
		attributes: {
			exclude: ["updatedAt"],
		},
	})
		.then((data) => {
			logger.info("Address-controller remove -- Address id is " + id + " success");
			res.status(200).send("success");
		})
		.catch((err) => {
			logger.error("Error validating Address with Address id=" + id + " error: " + err.message);
			res.status(500).send({
				Address: "message: Error validating Address with id=" + id + " error: " + err.message,
			});
		});
}

/**
 * Get address(es) for users
 * @param {object} Address - JSON representing Address
 * @param {number} userId - UserId for whom we are fetching addresses
 * @memberof Address
 */

async function getAddressesForUser(req, res) {
	const userId = req.query.userId;

	if (Utils.validateIntegerParam("user Id", userId) == false) {
		logger.error("address_request-controller accept address missing user Id or user id is not integer: " + userId);
		res.status(400).send({ message: "Error accepting address - user Id is missing or not integer" });
		return;
	}

	logger.info("address_request-controller getAddressesForUser, userId = " + userId);
}

module.exports = {
	create,
	remove,
};
