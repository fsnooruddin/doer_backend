"use strict";
/**
 * @namespace Badge
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Badge = db.badges;
const Op = db.Sequelize.Op;
//const { Badge_requestCreateSchema } = require('../schemas/Badge_request.js');
const Joi = require("joi");
const logger = require("../utils/Logger.js");

/**
 * Create a Badge
 * @param {object} Badge - JSON representing Badge
 * @param {number} Badge.id - Phone number requesting the Badge
 * @example
 * Sample payload:
 * {
 *    id: "3032221234"
 *  }
 * @memberof Badge
 */
async function create(req, res) {
	logger.info("req body in create Badge: ");
	logger.info(req.body);

	// Save Badge in the database
	Badge.create(req.body)
		.then((data) => {
			logger.info("Success creating Badge with Badge data =" + req.body);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error creating Badge with Badge data =" + req.body + " error: " + err.message);
			res.status(500).send("Some error occurred while creating the Badge: " + err.message);
		});
}

/**
 * Validate a Badge
 * @param {object} Badge - JSON representing Badge
 * @param {number} Badge.id - Phone number requesting the Badge
 * @param {string} Badge.otp - Badge to validate
 * @example
 * Sample payload:
 * {
 *    id: "3032221234",
 *    otp: "de8jw2"
 *  }
 * @memberof Badge
 */
async function get(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("Error retrieving Badges by ID, Badge Id is missing");
		res.status(400).send("Error retrieving Badges by id, Badge Id is missing");
		return;
	}

	Badge.findOne({
		where: {
			badge_id: id,
		},
		attributes: {
			exclude: ["updatedAt"],
		},
	})
		.then((data) => {
			logger.info("Badge-controller findById -- Badge id is " + id + " returning " + JSON.stringify(data));

			if (data == null) {
				res.status(500).send("message: Badge not found for id is " + id);
				return;
			}

			res.status(200).send(data);
			return;
		})
		.catch((err) => {
			logger.error("Error validating Badge with Badge id=" + id + " error: " + err.message);
			res.status(500).send({
				Badge: "message: Error validating Badge with id=" + id + " error: " + err.message,
			});
		});
}

module.exports = {
	create,
	get,
};
