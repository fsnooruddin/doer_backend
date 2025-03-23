"use strict";

/**
 * @namespace Review
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Review = db.reviews;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");

/**
 * Create a Review
 * @param {object} review - JSON representing Review
 * @param {number} review.doer_id - Doer Id being reviewed
 * @param {string} review.text - Text of review
 * @return {string|null} error string - null if success, error details if failure
 *
 * @example
 * Sample payload:
 *  {
     doer_id: "2",
     text: "Best Doer Ever"
   }
 * @memberof Review
 */
async function create(req, res) {
	logger.info("req body in create review: " + JSON.stringify(req.body));

	const data_obj = JSON.parse(utils.escapeJSONString(JSON.stringify(req.body)));

	try {
		// Save review in the database
		var new_review = await Review.create(data_obj);
		logger.info("Success creating review with review data =" + JSON.stringify(req.body));
		res.status(200).send(new_review);
		return;
	} catch (err) {
		logger.error("Error creating review with review data =" + req.body + " error: " + err.message);
		res.status(400).send({
			message: err.message || "Some error occurred while creating the review.",
		});
		return;
	}
}

/**
 * Find a single review with an id
 * @param {number} id - Id of review to retreive
 * @return {string|null} Review - null if failure, JSON object representing Review if success
 * @memberof Review
 */
async function findById(req, res) {
	const id = req.query.id;
	if (utils.validateIntegerParam("review ID", id) == false) {
		logger.error("review-controller review id is missing or not an integer");
		res.status(400).send("Error retrieving reviews by id, review Id is missing");
		return;
	}

	logger.info("review-controller findById review id = " + id);

	try {
		const data = await Review.findOne({
			where: { review_id: id },
			attributes: { exclude: ["updatedAt", "createdAt"] },
		});

		if (data == null) {
			logger.warn("data from find review is = null , review id = " + id);
			res.status(400).send("Couldn't find review");
			return;
		}

		logger.info("review-controller findById -- review id is " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);

		return;
	} catch (err) {
		logger.error("Error retrieving review with review id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error retrieving review with id=" + id + " error: " + err.message,
		});
		return;
	}
}

/**
 * Get all reviews for a doer
 * @param {number} doerId - Id of Doer for whom to fetch reviews
 * @return {string|null} Review - null if failure, JSON object representing Review if success
 * @memberof Review
 */
async function findByDoerId(req, res) {
	if (req.user == null) {
		logger.error("review-controller update, missing token");
		res.status(400).send({ Message: "Missing Token" });
		return;
	}

	console.log("user = " + JSON.stringify(req.user));
	const id = req.user.doerId;

	if (utils.validateIntegerParam("doer ID", id) == false) {
		logger.error("review-controller, findByDoerId by doer id is missing or not an integer");
		res.status(400).send("Error retrieving reviews by doer id, doer Id is missing or not integer");
		return;
	}

	logger.info("review-controller findByDoerId doer id = " + id);

	try {
		const data = await Review.findAll({
			where: { doer_id: id },
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		logger.info("review-controller findByDoerId -- doer id is " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error retrieving review with doer id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error retrieving review with doer id=" + id + " error: " + err.message,
		});
		return;
	}
}

module.exports = {
	create,
	findById,
	findByDoerId,
};
