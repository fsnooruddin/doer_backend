"use strict";

const db = require("../models");
const utils = require("../utils/Utils.js");
const Review = db.reviews;
const Op = db.Sequelize.Op;
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");

// Create and Save a new Review
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

	// Save doer in the database
	Review.create(data_obj)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the review.",
			});
		});
}

// Find a single review with an id
function findById(req, res) {
	const id = req.query.id;
	console.log("review-controller findOne id = " + id);
	Review.findOne({
		where: {
			review_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error retrieving review with id=" +
					id +
					" error: " +
					err.message,
			});
		});
}

// Find  reviews for a doer
function findByDoerId(req, res) {
	const id = req.query.doerId;
	console.log("review-controller findOne id = " + id);
	if(id == null) {
        res.status(500).send({
                message:
                  "Error retrieving Doer Id is missing"
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
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error retrieving review with doer id=" +
					id +
					" error: " +
					err.message,
			});
		});
}



module.exports = {
	create,
	findById,
	findByDoerId
};
