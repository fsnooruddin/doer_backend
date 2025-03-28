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
const dbQuery = require("../utils/DBQuery.js");
/**
 * Get the Top level categories
 * @return {array|null} error string - null if failure, array of categories if success
 * @memberof Category
 */
async function getContentForInitialScreen(req, res) {

	try {
		const response_data = await Category.findAll({
			where: {
				parent_aliases: "",
			},
			attributes: {
				exclude: ["updatedAt", "createdAt", "parent_aliases", "parent_id", "tags"],
			},
		});
		logger.info("category-controller getTopLevelCategories returning " + JSON.stringify(response_data));

		var top_response = null;
		var search_tags = "top";
		var top_categories = await dbQuery.category_getCategoriesByTagDBCall(search_tags);
        var top_doers = await dbQuery.doer_getDoersByTagDBCall(search_tags);
        var top_content = await dbQuery.marketing_getContentsByTagDBCall(search_tags);
		var nObj = {
		    service_response:  {
		    sections: [
		   { section_type: "categories",
		   title: "Categories",
		   items: response_data },
		   { section_type: "popular", title: "What's Popular",
		   items: top_categories},
		   { section_type: "top_doers",
		   title: "Top Doers",
           		   items: top_doers},
           		    { section_type: "promos",
                   		   title: "Promotions",
                              		   items: top_content},
		    ]

            }

		};
		console.log("nObj = " + JSON.stringify(nObj));
		res.status(200).send(JSON.stringify(nObj));
		return;
	} catch (err) {
		logger.error("Error retrieving getTopLevelCategories  error: " + err.message);
		res.status(500).send({
			message: "Error retrieving category tree  error: " + err.message,
		});
		return;
	}
}


module.exports = {
    getContentForInitialScreen,
}