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
 * @param {number} doer.user_id - User Id of user requesting the doer
 * @param {string} doer.services - Description of doer
 * @param {string} doer.review_count - Address of doer, e.g. "[77.6879689, 27.4072289]",
 * @param {string} doer.phone_number - Time for doer request, e.g. "Sun, 12-5",
 * @param {string} doer.rating - Services requested, e.g. "Electrician"
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Doer
 */
async function create(req, res) {
	console.log("req body in create doer: ");
	console.log(req.body);
	if (req.body == null) {
		logger.error("doer-controller create call missing payload");
		res.status(500).send({
			message: "Error creating Doer, data is missing",
		});

		return;
	}
	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	console.log("services = " + data_obj.services);
	console.log("services = " + JSON.stringify(data_obj.services));

	data_obj.availability = JSON.stringify(data_obj.availability);
	console.log("availability = " + data_obj.availability);
	console.log("slots = " + JSON.stringify(data_obj.availability.slots));

	try {
		// Save category in the database
		const response_data = await Doer.create(data_obj);
		res.status(200).send(response_data);
	} catch (err) {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Doer.",
		});
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
 * @memberof Doer
 */
function findByServices(req, res) {
	const services = req.query.services;
	if (services == null || services.trim() === "") {
		logger.error("doer-controller findByServices -- services is null or empty!");
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + " malformed input params.",
		});
		return;
	}

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
			res.send(data);
		})
		.catch((err) => {
			logger.error("doer-controller findByServices -- services is " + services + " error is " + err.message);
			res.status(500).send({
				message: "Error retrieving Doer with services =" + services + " error: " + err.message,
			});
		});
}

async function findByServicesAndDay(req, res) {
	const services = req.query.services;
	const day = req.query.day;
	if (services == null || services.trim() === "" || day == null || day.trim() === "") {
		logger.error("doer-controller findByServicesAndDay -- services or day is null!");
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + ", day: " + day + " malformed input params.",
		});
		return;
	}

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
		console.log("Error retrieving Doer with services =" + services + " error: " + err.message);
		return null;
	}
	logger.info("findByServicesAndDayDirect returning  " + data);
	return data;
}

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
	console.log("result of get doer in update avail = " + JSON.stringify(doer));
	doer.availability = JSON.stringify(avail);
	doer.changed("availability", true);
	const result = await doer.save();
	console.log("result of save doer in update avail = " + JSON.stringify(result));
	res.status(200).send("successfully update doer availability. doer id = " + id);
}

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
	console.log("User-controller getHistory id = " + id);

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
