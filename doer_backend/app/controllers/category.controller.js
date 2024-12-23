"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Category = db.categories;

const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");

// Create and Save a new Category
async function create(req, res) {
	//console.log("req body in create Category: ");
	//console.log(req.body);

	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

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

	try {
		// Save doer in the database
		const response_data = await Category.create(data_obj);
		res.status(200).send(response_data);
	} catch (err) {
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the Category.",
		});
	}
}

// Find a single category
async function findOneById(req, res) {
	const id = req.query.id;
	console.log("category-controller findOne id = " + id);
	try {
		const response_data = await Category.findAll({
			where: {
				category_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		res.send(response_data);
	} catch (err) {
		res.status(500).send({
			message:
				"Error retrieving category with id=" + id + " error: " + err.message,
		});
	}
}

// Find a single category
async function findOneByName(req, res) {
	const name = req.query.name;
	const search_str = "%" + name + "%";
	console.log("category-controller findOne name = " + name);
	try {
		const response_data = await Category.findAll({
			where: {
				name: {
					[Op.iLike]: search_str,
				},
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		res.send(response_data);
	} catch (err) {
		res.status(500).send({
			message:
				"Error retrieving category with name=" +
				name +
				" error: " +
				err.message,
		});
	}
}

// Find a single category
async function getCategoryTree(req, res) {
	const id = req.query.id;


	try {
		const response_data = await Category.findAll({
			where: {
				parent_id: id
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		res.send(response_data);
	} catch (err) {
		res.status(500).send({
			message:
				"Error retrieving category tree with id =" +
				id +
				" error: " +
				err.message,
		});
	}
}

module.exports = {
	create,
	findOneByName,
	findOneById,
	getCategoryTree
};
