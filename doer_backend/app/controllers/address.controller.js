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
 * {
 *    id: "3032221234"
 *  }
 * @memberof Address
 */
async function create(req, res) {
	console.log("req body in create Address: ");
	console.log(req.body);

	console.log("new Address in create Address: ");
	console.log(req.body);

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
 * Validate a Address
 * @param {object} Address - JSON representing Address
 * @param {number} Address.id - Phone number requesting the Address
 * @param {string} Address.otp - Address to validate
 * @example
 * Sample payload:
 * {
 *    id: "3032221234",
 *    otp: "de8jw2"
 *  }
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
			address_id: id
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

module.exports = {
	create,
	remove,
};
