"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Category = db.categories;

const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");

// Create and Save a new Category
function create(req, res) {
	console.log("req body in create Category: ");
	console.log(req.body);

	const data_obj = JSON.parse(
		Utils.escapeJSONString(JSON.stringify(req.body)),
	);

	/*
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

	// Save doer in the database
	Category.create(data_obj)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the Category.",
			});
		});
}

module.exports = {
	create
};
