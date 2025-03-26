"use strict";
/**
 * @namespace Category
 */
const db = require("../models");
const Utils = require("../utils/Utils.js");
const Category = db.categories;
const logger = require("../utils/Logger.js");
const Op = db.Sequelize.Op;
const i18next = require("i18next");

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
		res.status(400).send({ message: "Error retrieving category Id is missing" });
		return;
	}

	logger.info("category-controller findOneById id = " + id);
	try {
		var response_data = await Category.findByPk(id);
        if(response_data == null) {
        logger.error("category-controller findOneById couldn't find category with id: " + id);
        		res.status(400).send({ message: "category-controller findOneById couldn't find category with id: " + id });
        		return;
        }
		logger.info("category-controller findOneById id = " + id + " response data is = " + JSON.stringify(response_data));

		var entry = JSON.parse(JSON.stringify(response_data));
		console.log("language = " + i18next.resolvedLanguage);

		entry.tr_name = req.t(entry.name, { ns: "category" });
		entry.tr_alias = req.t(entry.alias, { ns: "category" });

		console.log("new entry " + JSON.stringify(entry));

		logger.info("category-controller findOneById id = " + id + " tr response is = " + JSON.stringify(entry));
		res.send(entry);
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
		const response_data = await Category.findOne({
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
	console.log("getCategoryTree id = " + req.query.id);
	if (Utils.validateIntegerParam("Category Id", req.query.id) == false) {
		logger.error("category-controller getCategoryTree missing categoryId");
		res.status(400).send({ message: "Error retrieving category tree Id is missing" });
		return;
	}
	const id = req.query.id;
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

/**
 * Get the Top level categories
 * @return {array|null} error string - null if failure, array of categories if success
 * @memberof Category
 */
async function getTopLevelCategories(req, res) {
	try {
		const response_data = await Category.findAll({
			where: {
				parent_aliases: "",
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		logger.info("category-controller getTopLevelCategories returning " + JSON.stringify(response_data));
		res.send(response_data);
	} catch (err) {
		logger.error("Error retrieving getTopLevelCategories  error: " + err.message);
		res.status(500).send({
			message: "Error retrieving category tree  error: " + err.message,
		});
	}
}

/**
 * Add tag(s) to category
 * @params {number} id -- Category id to add tag to
 * @params {string} tags -- comma seperated list of tags
 * @return {array|null} error string - null if failure, array of categories if success
 * @memberof Category
 */
async function addTags(req, res) {
    console.log("category addTags");
	const id = req.query.id;
	if (Utils.validateIntegerParam("Category Id", id) == false) {
		logger.error("category-controller addTagToCategory missing categoryId or id not integer: " + id);
		res.status(400).send({ message: "Error adding tag to category Id is missing" });
		return;
	}
	const new_tags = req.query.tags;
	if(new_tags == null) {
		logger.error("category-controller addTagToCategory missing tags");
		res.status(400).send({ message: "Error adding tag to category tag(s) missing" });
		return;
	}

	logger.info("category-controller addTagToCategory id = " + id + " tags are: " + new_tags);
	try {
		const response_data = await Category.update({tags: new_tags},
		{
			where: {
				category_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		logger.info("category-controller addTagToCategory returning " + JSON.stringify(response_data));
		res.send(response_data);
	} catch (err) {
		logger.error("Error addTagToCategory  error: " + err.message);
		res.status(500).send({
			message: "Error addTagToCategory error: " + err.message,
		});
	}
}


/**
 * Get category(s) by tag(s)
 * @params {string} tags -- comma seperated list of tags to search for
 * @return {array|null} error string - null if failure, array of categories if success
 * @memberof Category
 */
async function getByTags(req, res) {
    console.log("category addTags");

	const search_tags = req.query.tags;
	if(Utils.validateStringParam("Search Tags", search_tags) == false) {
		logger.error("category-controller getByTags missing tags or tags are empty");
		res.status(400).send({ message: "Error searching category by tag(s) missing, tags missing or empty" });
		return;
	}

	logger.info("category-controller getByTags tags are: " + search_tags);
	try {
		const response_data = await Category.findAll({ where: {tags: { [Op.iLike]: search_tags } },
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		logger.info("category-controller getByTags returning " + JSON.stringify(response_data));
		res.send(response_data);
	} catch (err) {
		logger.error("Error addTagToCategory  error: " + err.message);
		res.status(500).send({
			message: "Error addTagToCategory error: " + err.message,
		});
	}
}


module.exports = {
	create,
	findOneByName,
	findOneById,
	getCategoryTree,
	getTopLevelCategories,
	addTags,
	getByTags
};
