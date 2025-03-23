"use strict";
/**
 * @namespace Badge
 */

const db = require("../models");
const utils = require("../utils/Utils.js");
const Badge = db.badges;
const UserBadgeAssociations = db.user_badge_associations;
const DoerBadgeAssociations = db.doer_badge_associations;
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
	logger.info("req body in create Badge: " + JSON.stringify(req.body));

	try {
		// Save Badge in the database
		let new_badge = await Badge.create(req.body);
		logger.info("Success creating Badge with Badge data =" + JSON.stringify(req.body));
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

	if (utils.validateIntegerParam("badge ID", id) == false) {
		logger.error("Error retrieving Badges by ID, Badge Id is missing or not integer.");
		res.status(400).send("Error retrieving Badges by id, Badge Id is missing or not integer.");
		return;
	}

	try {
		const data = await Badge.findOne({
			where: {
				badge_id: id,
			},
			attributes: {
				exclude: ["updatedAt"],
			},
		});

		logger.info("Badge-controller findById -- Badge id is " + id + " returning " + JSON.stringify(data));

		if (data == null) {
			res.status(400).send("message: Badge not found for id is " + id);
			return;
		}

		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error validating Badge with Badge id=" + id + " error: " + err.message);
		res.status(500).send({
			Badge: "message: Error validating Badge with id=" + id + " error: " + err.message,
		});
	}
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
	logger.info("badge-controller assignBadgeToUser, body = " + JSON.stringify(req.body));

	try {
		const data = await UserBadgeAssociations.create(req.body);

		if (data == null) {
			logger.error("failed to assign badge to user, create return null.");
			res.status(400).send("assign badge to user failed.");
			return;
		}

		logger.info("Success associating badge with user = " + JSON.stringify(req.body));
		res.status(200).send(data);
	} catch (err) {
		logger.error("Error associating badge with user = " + JSON.stringify(req.body) + " error: " + err.message);
		res.status(500).send("Error occurred while associating badge with user = : " + err.message);
	}
}

/**
 * Assign a Badge to a Doer
 * @param {number} Badge.id - Badge to assign
 * @param {number} Badge.doerId - Doer to assign badge to
 * @return {string} badge - null if success, error string if error
 * @memberof Badge
 */
async function assignBadgeToDoer(req, res) {
	logger.info("badge-controller assignBadgeToDoer, body = " + JSON.stringify(req.body));
	try {
		const data = await DoerBadgeAssociations.create(req.body);
		if (data == null) {
			logger.error("failed to assign badge to doer, create return null.");
			res.status(400).send("assign badge to doer failed.");
			return;
		}
		logger.info("Success associating badge with doer = " + JSON.stringify(req.body));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error associating badge with doer =  =" + JSON.stringify(req.body) + " error: " + err.message);
		res.status(500).send("Some error occurred while associating badge with doer = : " + err.message);
		return;
	}
}

/**
 * Remove a Badge from a Doer
 * @param {number} Badge.id - Badge to remove
 * @param {number} Badge.doerId - Doer to remove badge from
 * @return {string} badge - null if success, error string if error
 * @memberof Badge
 */
async function removeBadgeFromDoer(req, res) {
	logger.info("badge-controller removeBadgeFromDoer, body = " + JSON.stringify(req.body));
	// Save Badge in the database
	try {
		const data = DoerBadgeAssociations.delete(req.body);
		if (data == null) {
			logger.error("failed to remove badge from doer, create return null.");
			res.status(400).send("remove badge from doer failed.");
			return;
		}
		logger.info("Success removing badge from doer = " + JSON.stringify(req.body));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error removing badge from doer = " + JSON.stringify(req.body) + " error: " + err.message);
		res.status(500).send("Some error occurred while removing badge from doer = : " + err.message);
		return;
	}
}

/**
 * Remove a Badge from a User
 * @param {number} Badge.id - Badge to remove
 * @param {number} Badge.UserId - User to remove badge from
 * @return {string} badge - null if success, error string if error
 * @memberof Badge
 */
async function removeBadgeFromUser(req, res) {
	logger.info("badge-controller removeBadgeFromUser, body = " + JSON.stringify(req.body));
	// Save Badge in the database

	try {
		const data = UserBadgeAssociations.delete(req.body);
		if (data == null) {
			logger.error("failed to remove badge from user, create return null.");
			res.status(400).send("remove badge from user failed.");
			return;
		}

		logger.info("Success removing badge from User = " + JSON.stringify(req.body));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error removing badge from User = " + JSON.stringify(req.body) + " error: " + err.message);
		res.status(500).send("Some error occurred while removing badge from User = : " + err.message);
		return;
	}
}

module.exports = {
	create,
	get,
	assignBadgeToUser,
	assignBadgeToDoer,
	removeBadgeFromUser,
	removeBadgeFromDoer,
};
