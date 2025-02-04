"use strict";

/**
 * @namespace Doer
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const Job = db.job_requests;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");
const logger = require("../utils/Logger.js");
const opentelemetry = require("@opentelemetry/api");

/**
 * Create a Doer
 * @param {object} doer - JSON representing Doer
 * @param {string} doer.name - Name of Doer
 * @param {string} doer.phone_number - Phone number of Doer
 * @param {string} doer.location - Address of doer, e.g.
 * ```
 * "{city: Union City ,state: CA,zip_code: 94587,address: ['2837 Whipple Rd', 'Ste A', 'Union City , CA 94587'],coordinates: {'latitude': 37.6059449, 'longitude': -122.0708683}}"
 * ```
 * @param {string} doer.services - Services offered by Doer (these are categories). E.g. "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]"
 * @param {string} doer.availability - Array of timeslots when Doer is available. e.g.
 *
 * ```
 * [
 *      {
 *           "day": "Fri",
 *           "time": "10-13",
 *           "rate": 99,
 *           "location": "94588"
 *       },
 *       {
 *           "day": "Sat",
 *           "time": "9-17",
 *           "rate": 80,
 *           "location": "94588"
 *       }
 *   ]
 * ```
 * @param {number} doer.rating - Current Rating of Doer
 * @param {number} doer.minimum_charges - Minimum the Doer will charge for any service
 * @param {string} doer.img_url - URL for Doer
 * @return {string|null} error string - null if success, error details if failure
 * @example
 * Sample Payload:
 *  {
 *      "doer_id": 2,
 *      "name": "TD West Electric",
 *      "phone_number": "(510) 342-2818",
 *      "location": "{city: Union City ,state: CA,zip_code: 94587,address: ['2837 Whipple Rd', 'Ste A', 'Union City , CA 94587'],coordinates: {'latitude': 37.6059449, 'longitude': -122.0708683}}",
 *      "services": "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
 *      "availability": "[{\"day\":\"Fri\",\"time\":\"10-13\",\"rate\":99,\"location\":\"94588\"},{\"day\":\"Sat\",\"time\":\"9-17\",\"rate\":80,\"location\":\"94588\"}]",
 *      "rating": 5.8,
 *      "minimum_charges": 97,
 *      "img_url": "https://s3-media2.fl.yelpcdn.com/bphoto/NLxw4Bt_7-clB1mIm0n31Q/o.jpg"
 *  }
 * @memberof Doer
 */
async function create(req, res) {

	if (req.body == null) {
		logger.error("doer-controller create call missing payload");
		res.status(500).send({
			message: "Error creating Doer, data is missing",
		});

		return;
	}

	var data_obj;
	try {
	    logger.info("req body in create doer: " + JSON.stringify(req.body));
		data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));
	} catch (err) {
		logger.error("error parsing json + " + err.message);
		res.status(500).send("Error parsing json body. error = " + err.message);
		return;
	}

	data_obj.availability = JSON.stringify(data_obj.availability);

	try {
		// Save category in the database
		const response_data = await Doer.create(data_obj);
		res.status(200).send(response_data);
	} catch (err) {
		logger.error("doer-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Doer.",
		});
		return;
	}
}

/**
 * Find a single Doer with an id
 * @param {number} id - Doer Id of doer to retreive
 * @return {string|null} Doer - null if failure, JSON object representing Doer if success
 * @memberof Doer
 */
async function findById(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("doer-controller findById missing doerId");
		res.status(500).send({
			message: "Error retrieving Doer Id is missing",
		});

		return;
	}

	logger.info("Doer-controller findOne id = " + id);
	const data = await findByIdDBCall(id);

	if (data == null) {
		logger.error("doer-controller findById couldn't find doer with doerId " + id);
		res.status(500).send({
			message: "Error retrieving Doer with id=" + id,
		});
	} else {
		res.status(200).send(data);
		return;
	}
}

// Find a single Doer with an id
async function findByIdDBCall(id) {
	try {
		const data = await Doer.findOne({
			where: {
				doer_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});

		if (data == null) {
			logger.error("doer-controller findByIdDBCall couldn't find doer with doerId " + id);
			return null;
		}

		return data;
	} catch (err) {
		logger.error("doer-controller findByIdDBCall couldn't find doer with doerId " + id + "with error " + error.message);
		return null;
	}
}

/**
 * Find Doers by services offered
 * @param {string} services - Services to search by
 * @return {string|null} Doer - null if failure, JSON array object representing Doers offering services if success
 * @memberof Doer
 */
function findByServices(req, res) {
	var services = req.query.services;
	if (services == null || services.trim() === "") {
		logger.error("doer-controller findByServices -- services is null or empty!");
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + " malformed input params.",
		});
		return;
	}

	services = "%" + services + "%";
	logger.info("Doer-controller findOne services = " + services);

	Doer.findAll({
		where: {
			services: {
				[Op.iLike]: services,
			},
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("doer-controller findByServices -- services is " + services + " returning " + data);
			res.status(200).send(data);
		})
		.catch((err) => {
			logger.error("doer-controller findByServices -- services is " + services + " error is " + err.message);
			res.status(500).send({
				message: "Error retrieving Doer with services =" + services + " error: " + err.message,
			});
		});
}

/**
 * Find Doers by services offered AND availability on given day
 * @param {string} services - Services to search by
 * @param {string} day - Day on which Doer should have availability
 * @return {string|null} Doer - null if failure, JSON array object representing Doers offering services if success
 * @memberof Doer
 */
async function findByServicesAndDay(req, res) {
	var services = req.query.services;
	var day = req.query.day;
	if (services == null || services.trim() === "" || day == null || day.trim() === "") {
		logger.error("doer-controller findByServicesAndDay -- services or day is null!");
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + ", day: " + day + " malformed input params.",
		});
		return;
	}

	services = "%" + services + "%";
	day = "%" + day + "%";
	logger.info("Doer-controller findByServicesAndDay services = " + services + ", day = " + day);

	Doer.findAll({
		where: {
			services: {
				[Op.iLike]: services,
			},
			availability: {
				[Op.iLike]: day,
			},
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
				message: "Error retrieving Doer with services =" + services + " error: " + err.message,
			});
		});
}

async function findByServicesAndDayDBCall(services, day) {
	logger.info("Doer-controller findByServicesAndDay services = " + services + " day = " + day);
	let data = null;
	try {
		data = await Doer.findAll({
			where: {
				services: {
					[Op.iLike]: services,
				},
				availability: {
					[Op.iLike]: day,
				},
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
	} catch (err) {
		logger.info("Error retrieving Doer with services =" + services + " error: " + err.message);
		return null;
	}
	logger.info("findByServicesAndDayDirect returning  " + data);
	return data;
}

/**
 * Update Availability of a Doer
 * @param {number} id - ID of Doer to update
 * @param {string} availability - String representing new Availability JSON structure
 *
 * @example
 * Sample payload:
 * [
 *      {
 *           "day": "Fri",
 *           "time": "10-13",
 *           "rate": 99,
 *           "location": "94588"
 *       },
 *       {
 *           "day": "Sat",
 *           "time": "9-17",
 *           "rate": 80,
 *           "location": "94588"
 *       }
 *   ]
 * @memberof Doer
 */
async function updateAvailability(req, res) {
	const id = req.query.id;
	const avail = req.body.availability;

	if (id == null) {
		logger.error("doer-controller updateAvailability missing doerId");
		res.status(500).send({
			message: "Error updateAvailability Doer Id is missing",
		});

		return;
	}

	if (avail == null) {
		logger.error("doer-controller updateAvailability availability is missing or empty");
		res.status(500).send({
			message: "Error updateAvailability availabilty is missing or empty",
		});

		return;
	}

	logger.info("Doer-controller updateAvailability id = " + id + " avail = " + avail);

	var doer = {};
	try {
		doer = await Doer.findOne({
			where: { doer_id: id },
			attributes: { exclude: ["updatedAt", "createdAt"] },
		});
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving doer for rate with doer id=" + id + " error: " + err.message,
		});
		return;
	}

	if (doer == null) {
		res.status(200).send("couldn't update doer availability. Couldn't find doer with id = " + id);
		return;
	}
	logger.info("result of get doer in update avail = " + JSON.stringify(doer));
	doer.availability = JSON.stringify(avail);
	doer.changed("availability", true);
	const result = await doer.save();
	logger.info("result of save doer in update avail = " + JSON.stringify(result));
	res.status(200).send("successfully update doer availability. doer id = " + id);
}

/**
 * Rate a Doer
 * @param {number} id - ID of Doer being rated
 *
 * @memberof Doer
 */
async function rating(req, res) {
	const id = req.query.id;
	if (id == null) {
		logger.error("doer-controller rating missing doerId");
		res.status(500).send({
			message: "Error rating Doer Id is missing",
		});

		return;
	}
	logger.info("Doer-controller rating id = " + id);

	Doer.increment("rating", {
		by: 1,
		where: {
			doer_id: id,
		},
	});

	res.status(200).send("successfully rated doer with id = " + id);
}

async function getHistory(req, res) {
	const id = req.query.id;
	logger.info("User-controller getHistory id = " + id);

	const doer = await Doer.findOne({
		where: { doer_id: id },
		attributes: { exclude: ["updatedAt"] },
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving doer for rate with doer id=" + doerId + " error: " + err.message,
			});
		});

	/*
	const completed_jobs_history = await Job.findAll({
		where: { doer_id: id, status: 'completed' },
		attributes: { exclude: ["updatedAt"] },
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving completed_jobs for doer id=" + id + " error: " + err.message,
			});
		});

	const accepted_jobs_history = await Job.findAll({
		where: { doer_id: id, status: 'accepted' },
		attributes: { exclude: ["updatedAt"] },
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving accepted_jobs for doer id=" + id + " error: " + err.message,
			});
		});

	const history = {
		doer_profile: doer,
		completed_jobs: completed_jobs_history,
		accepted_jobs: accepted_jobs_history,
	};

	res.send(history);
	*/
}

module.exports = {
	create,
	findById,
	findByIdDBCall,
	findByServices,
	findByServicesAndDay,
	findByServicesAndDayDBCall,
	getHistory,
	rating,
	updateAvailability,
};
