"use strict";

/**
 * @namespace User
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const User = db.users;
const Job = db.job_requests;
const Op = db.Sequelize.Op;
const { userCreateSchema, userGetSchema } = require("../schemas/user.js");
const Joi = require("joi");
const logger = require("../utils/Logger.js");
const opentelemetry = require("@opentelemetry/api");

/**
 * Create a User
 * @param {object} user - JSON representing User
 * @param {string} user.name - Name of User
 * @param {string} user.phone_number - Phone number of User
 * @param {string} user.location - Address of user, e.g.
 * ```
 * "{'2837 Whipple Rd', 'Ste A', 'Union City , CA 94587'}"
 * ```
 * @param {string} doer.img_url - URL for User
 * @return {string|null} error string - null if success, error details if failure
 * @example
 * Sample Payload:
 *  {
 *      "doer_id": 2,
 *      "name": "TD West Electric",
 *      "phone_number": "(510) 342-2818",
 *      "location": "{city: Union City ,state: CA,zip_code: 94587,address: ['2837 Whipple Rd', 'Ste A', 'Union City , CA 94587'],coordinates: {'latitude': 37.6059449, 'longitude': -122.0708683}}",
 *      "services": "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
 *      "availability": "[{\"day\":\"Fri\",\"time\":\"10-13\",\"rate\":99,\"location\":\"94588\"},{\"day\":\"Sat\",\"time\":\"9-17\",\"rate\":80,\"location\":\"94588\"}]",
 *      "rating": 5.8,
 *      "minimum_charges": 97,
 *      "img_url": "https://s3-media2.fl.yelpcdn.com/bphoto/NLxw4Bt_7-clB1mIm0n31Q/o.jpg"
 *  }
 * @memberof User
 */
async function create(req, res) {
	if (req.body == null) {
		logger.error("user-controller create call missing payload");
		res.status(500).send({
			message: "Error creating User, data is missing",
		});

		return;
	}

	var data_obj;
	try {
		logger.info("req body in create user: " + JSON.stringify(req.body));
		data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));
	} catch (err) {
		logger.error("error parsing json + " + err.message);
		res.status(500).send("Error parsing json body. error = " + err.message);
		return;
	}

	data_obj.availability = JSON.stringify(data_obj.availability);
	data_obj.rating = JSON.stringify(data_obj.rating);
	try {
		// Save category in the database
		const response_data = await User.create(data_obj);
		res.status(200).send(response_data);
	} catch (err) {
		logger.error("user-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the User.",
		});
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
	const data = await findByIdDBCall(id);

	if (data == null) {
		logger.error("user-controller findById couldn't find user with userId " + id);
		res.status(500).send({
			message: "Error retrieving User with id=" + id,
		});
	} else {
		res.status(200).send(data);
		return;
	}
}


module.exports = {
	create,
	findById,
};
