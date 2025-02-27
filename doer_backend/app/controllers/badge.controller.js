"use strict";
/**
 * @namespace Badge
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Badge = db.badges;
const UserBadgeAssociations = db.user_badge_associations;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");

/**
 * Create a Badge
 * @param {object} Badge - JSON representing Badge
 * @param {number} Badge.name - Name of badge
 * @param {number} Badge.description - Description of badge
 * @param {number} Badge.icon_url - URL of badge icon
 * @return {string} -- null if success, error string if failure
 * @example
 * {
 *      name: "cool badge",
 *      description: "Best badge Ever",
 *      icon_url: "icon.pic"
 *    }
 *
 * @memberof Badge
 */
async function create(req, res) {
	logger.info("req body in create Badge: ");
	logger.info(req.body);

	try {
		// Save Badge in the database
		let new_badge = Badge.create(req.body);
		logger.info("Success creating Badge with Badge data =" + req.body);
		res.status(200).send(new_badge);
		return;
	} catch (err) {
		logger.error("Error creating Badge with Badge data =" + req.body + " error: " + err.message);
		res.status(500).send("Some error occurred while creating the Badge: " + err.message);
		return;
	}
}

/**
 * Get a Badge
 * @param {number} Badge.id - Badge to retreive
 * @return {string} badge - Badge if found, error string if error
 * @example
 * Sample payload:
 *  {
 *          badge_id: 1,
 *          name: 'cool badge',
 *          description: 'Best badge Ever',
 *          icon_url: 'icon.pic',
 *          createdAt: '2025-02-21T04:57:48.686Z'
 *        }
 *
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

/**
 * Assign a Badge to a User
 * @param {number} Badge.id - Badge to assign
 * @param {number} Badge.userId - User to assign badge to
 * @return {string} badge - null if success, error string if error
 * @memberof Badge
 */
async function assignBadgeToUser(req, res) {
	// Save Badge in the database
	UserBadgeAssociations.create(req.body)
		.then((data) => {
			logger.info("Success associating badge with user = " + req.body);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("Error associating badge with user =  =" + req.body + " error: " + err.message);
			res.status(500).send("Some error occurred while associating badge with user = : " + err.message);
		});
}

module.exports = {
	create,
	get,
	assignBadgeToUser,
};
