"use strict";

/**
 * @namespace Review
 */


const db = require("../models");
const utils = require("../utils/Utils.js");
const Review = db.reviews;
const Op = db.Sequelize.Op;
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");
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
function create(req, res) {
	console.log("req body in create review: ");
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

	console.log("new review in create review: ");
	console.log(data_obj);

	// Save review in the database
	Review.create(data_obj)
		.then((data) => {
			logger.info("Success creating review with review data =" + req.body);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error creating review with review data =" + req.body + " error: " + err.message);
			res.status(500).send({
				message: err.message || "Some error occurred while creating the review.",
			});
		});
}


/**
 * Find a single review with an id
 * @param {number} id - Id of review to retreive
 * @return {string|null} Review - null if failure, JSON object representing Review if success
 * @memberof Review
 */
function findById(req, res) {
	const id = req.query.id;
	if (id == null) {
		logger.error("Error retrieving reviews by ID, review Id is missing");
		res.status(500).send({
			message: "Error retrieving reviews by id, review Id is missing",
		});

		return;
	}
	logger.info("review-controller findById review id = " + id);
	console.log(typeof id);
	console.log(parseInt(id));

	if (isNaN(parseInt(id))) {
		logger.error("Error retrieving reviews by ID, review Id is not integer, id = " + id);
		res.status(500).send({
			message: "Error retrieving reviews by id, review Id is not integer",
		});

		return;
	}

	Review.findOne({
		where: {
			review_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("review-controller findById -- review id is " + id + " returning " + data);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error retrieving review with review id=" + id + " error: " + err.message);
			res.status(500).send({
				message: "Error retrieving review with id=" + id + " error: " + err.message,
			});
		});
}

/**
 * Get all reviews for a doer
 * @param {number} doerId - Id of Doer for whom to fetch reviews
 * @return {string|null} Review - null if failure, JSON object representing Review if success
 * @memberof Review
 */
function findByDoerId(req, res) {
	const id = req.query.doerId;

	if (id == null) {
		logger.error("Error retrieving reviews by DoerID, Doer Id is missing");
		res.status(500).send({
			message: "Error retrieving reviews by DoerID, Doer Id is missing",
		});

		return;
	}
	logger.info("review-controller findByDoerId doer id = " + id);

	if (isNaN(parseInt(id))) {
		logger.error("Error retrieving reviews by Doer ID, doer Id is not integer");
		res.status(500).send({
			message: "Error retrieving reviews by doer id, doer Id is not integer",
		});

		return;
	}

	Review.findAll({
		where: {
			doer_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("review-controller findByDoerId -- doer id is " + id + " returning " + data);
			res.status(200).send(data);
			return;
		})
		.catch((err) => {
			logger.error("Error retrieving review with doer id=" + id + " error: " + err.message);
			res.status(500).send({
				message: "Error retrieving review with doer id=" + id + " error: " + err.message,
			});
			return;
		});
}

module.exports = {
	create,
	findById,
	findByDoerId,
};
