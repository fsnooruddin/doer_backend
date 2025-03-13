"use strict";
/**
 * @namespace Category
 */
const db = require("../models");
const Utils = require("../utils/Utils.js");
const Category = db.categories;
const logger = require("../utils/Logger.js");
const Op = db.Sequelize.Op;

/**
 * Create a new Category
 * @param {object} category - JSON representing Category
 * @param {string} category.title - Name of category ( suitable for display )
 * @param {string} category.parent_aliases - Array containing aliases of parent categories.
 *
 * @example
 * Sample Payload:
 *
 *  {
 *      "alias": "professional",
 *      "title": "Professional Services",
 *      "parent_aliases": []
 *    }
 *
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Category
 */
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
		// Save category in the database
		const response_data = await Category.create(data_obj);
		res.status(200).send(response_data);
	} catch (err) {
		logger.error("category-controller error occured when creating category, error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Category.",
		});
	}
}

/**
 * Find a single Category with an id
 * @param {number} id - Category id to fetch
 * @return {object|null} error string - error string if failure, category JSON ojbect if success
 * @memberof Category
 */
async function findOneById(req, res) {
	const id = req.query.id;
	if (id == null) {
		logger.error("category-controller findOneById missing categoryId");
		res.status(500).send({ message: "Error retrieving category Id is missing" });
		return;
	}

	logger.info("category-controller findOneById id = " + id);
	try {
		const response_data = await Category.findAll({
			where: {
				category_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		logger.info("category-controller findOneById id = " + id + " response is = " + JSON.stringify(response_data));
		for (let i = 0; i < response_data.length; i++) {
                console.log(JSON.stringify(response_data[i]));
                const tr_alias = req.t(response_data[i].alias, { ns: 'category' });
        		console.log("alias = " + response_data[i].alias + " tr alias = " + tr_alias);

        	}

		logger.info("category-controller findOneById id = " + id + " response is = " + JSON.stringify(response_data));
		res.send(response_data);
	} catch (err) {
		logger.error("Error retrieving category with id=" + id + " error: " + err.message);
		res.status(500).send({ message: "Error retrieving category with id=" + id + " error: " + err.message });
	}
}

/**
 * Find a single Category with an name
 * @param {string} name - Category name to fetch
 * @return {object|null} error string - error string if failure, category JSON object if success
 * @memberof Category
 */
async function findOneByName(req, res) {
	const name = req.query.name;
	if (name == null || name.trim() === "") {
		logger.error("category-controller findOneByName missing or empty name");
		res.status(500).send({
			message: "Error retrieving category name is missing or empty",
		});

		return;
	}

	const search_str = "%" + name + "%";
	logger.info("category-controller findOneByName name = " + name);
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
		logger.info("category-controller findOne name = " + name + " response is = " + JSON.stringify(response_data));
		res.send(response_data);
	} catch (err) {
		logger.error("Error retrieving category with name=" + name + " error: " + err.message);
		res.status(500).send({ message: "Error retrieving category with name=" + name + " error: " + err.message });
	}
}

/**
 * Get the Category tree (all children) for the Category with given id. Returns all categories that have this category as parent.
 * @param {number} id - Category id to fetch tree for
 * @return {array|null} error string - null if failure, array of categories if success
 * @memberof Category
 */
async function getCategoryTree(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("category-controller getCategoryTree missing categoryId");
		res.status(500).send({
			message: "Error retrieving category tree Id is missing",
		});

		return;
	}

	try {
		const response_data = await Category.findAll({
			where: {
				parent_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		logger.info("category-controller getCategoryTree for categoryId " + id + " returning " + response_data);
		res.send(response_data);
	} catch (err) {
		logger.error("Error retrieving category tree with id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error retrieving category tree with id =" + id + " error: " + err.message,
		});
	}
}

module.exports = {
	create,
	findOneByName,
	findOneById,
	getCategoryTree,
};
