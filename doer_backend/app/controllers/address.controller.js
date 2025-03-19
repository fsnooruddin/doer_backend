"use strict";
/**
 * @namespace Address
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Address = db.addresses;
const Testing = db.tests;
const Op = db.Sequelize.Op;
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
 *      zipCode: "10001",
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

	try {
		// Save Address in the database
		let new_address = await Address.create(req.body);
		logger.info("Success creating Address with Address data =" + JSON.stringify(new_address));
		res.status(200).send(new_address);
		return;
	} catch (err) {
		logger.error("Error creating Address with Address data =" + req.body + " error: " + err.message);
		res.status(500).send("Some error occurred while creating the Address.");
		return;
	}
}

/**
 * Remove  a Address
 * @param {number} id - Id of address being removed
 * @return {object} string - null if success, error message if error
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

	try {
		const ret_str = await Address.destroy({
			where: {
				address_id: id,
			},
			attributes: {
				exclude: ["updatedAt"],
			},
		});

		logger.info("Address-controller remove -- Address id is " + id + " success");
		res.status(200).send("success");
		return;
	} catch (err) {
		logger.error("Error removing Address with Address id=" + id + " error: " + err.message);
		res.status(400).send({
			Address: "message: Error removing Address with id=" + id + " error: " + err.message,
		});
		return;
	}
}

/**
 * Update  an Address
 * @param {address} address - JSON representing addresss being updated
 * @return {object} string - null if success, error message if error
 * @memberof Address
 */
async function update(req, res) {
	logger.info(JSON.stringify(req.body));
	const id = req.query.id;

	if (id == null) {
		logger.error("Error retrieving Addresss by ID, Address Id is missing");
		res.status(500).send({
			Address: "Error retrieving Addresss by id, Address Id is missing",
		});

		return;
	}

	try {
		var addr = await Address.findOne({
			where: {
				address_id: id,
			},
		});
		if (addr == null) {
			logger.error("Error updating Address with Address id=" + id + " address not found");
			res.status(400).send({
				Address: "message: Error updating Address with id=" + id + " address not found",
			});
			return;
		}
		var new_addr = await addr.set(req.body);
		logger.info("Address-controller update -- Address id is " + id + " success, new address = " + JSON.stringify(new_addr));
		res.status(200).send(new_addr);
	} catch (err) {
		logger.error("Error updating Address with Address id=" + id + " error: " + err.message);
		res.status(500).send({
			Address: "message: Error updating Address with id=" + id + " error: " + err.message,
		});
	}
}

/**
 * Find a single Address with an id
 * @param {number} id - Address id to fetch
 * @memberof Address
 */
async function findById(req, res) {
	const id = req.query.id;
	if (Utils.validateIntegerParam("address ID", id) == false) {
		logger.error("address-controller address id is missing or not an integer");
		res.status(400).send("Error retrieving address by id, address Id is missing or not an integer");
		return;
	}

	logger.info("address_request-controller findById, address id = " + id);

try {
		var addr = await Address.findOne({
    			where: {
    				address_id: id,
    			},
    		});
	if (data == null) {
		logger.warn("address-controller findById returning null, id = " + id);
		res.status(200).send("address find failed   " + id);
		return;
	} else {
		logger.debug("address-controller findById returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	}
	} catch (err) {
    		logger.error("address-controller findById call failed. error = " + err.message);
    		res.status(500).send({
    			message: "Some error occurred while fetching the address." + err.message
    		});
    		return;
    	}

}


async function testings(req, res) {
	const data = req.body;

	try {
		logger.info("testings-controller create SUCCESS ... " + JSON.stringify(data));
		const response_data = await Testing.create(data);
		logger.info("testings-controller create SUCCESS ... ");
		//t	KU.sendTestingsRequestedMessage(response_data.testings_id, response_data.user_id, response_data.time, response_data.location, response_data.services);
		res.status(200).send(response_data);
		return;
	} catch (err) {
		logger.error("testings-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Testings.",
		});
		return;
	}
}

async function find_testings(req, res) {
	const data = req.body;

	try {
		logger.info("testings-controller create SUCCESS ... " + JSON.stringify(data));
		const response_data = await Testing.findAll({
			where: {
				"availability.slot.day": "ZZ",
			},
		});
		logger.info("testings-controller find_testings SUCCESS ... " + JSON.stringify(response_data));
		//t	KU.sendTestingsRequestedMessage(response_data.testings_id, response_data.user_id, response_data.time, response_data.location, response_data.services);
		res.status(200).send(response_data);
		return;
	} catch (err) {
		logger.error("testings-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Testings.",
		});
		return;
	}
}

module.exports = {
	create,
	remove,
	update,
	findById,
	testings,
	find_testings,
};
