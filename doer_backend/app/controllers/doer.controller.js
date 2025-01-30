"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const AcceptedJobs = db.accepted_jobs;
const StartedJobs = db.started_jobs;
const CompletedJobs = db.completed_jobs;
const Job = db.job_requests;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");

// Create and Save a new Doer
async function create(req, res) {
	console.log("req body in create doer: ");
	console.log(req.body);

	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));
	//const data_obj_1 = JSON.parse(Utils.escapeJSONString(data_obj.availability));

	console.log("services = " + data_obj.services);
	console.log("services = " + JSON.stringify(data_obj.services));

	data_obj.availability = JSON.stringify(data_obj.availability);
	console.log("availability = " + data_obj.availability);
	console.log("slots = " + JSON.stringify(data_obj.availability.slots));

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

// Find a single Doer with an id
async function findById(req, res) {
	const id = req.query.id;
	console.log("Doer-controller findOne id = " + id);
	if (id == null) {
		res.status(500).send({
			message: "Error retrieving Doer Id is missing",
		});

		return;
	}

	const data = await findByIdDBCall(id);

	if (data == null) {
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
			res.status(200).send("find doer failed  " + "couldn't find doer");
			return;
		}

		return data;
	} catch (err) {
		console.log("Error retrieving Doer with id=" + id + " error: " + err.message);
		return null;
	}
}

// Find a single Doer by services
function findByServices(req, res) {
	const services = req.query.services;
	console.log("Doer-controller findOne services = " + services);
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
			res.status(500).send({
				message: "Error retrieving Doer with services =" + services + " error: " + err.message,
			});
		});
}

async function findByServicesAndDay(req, res) {
	const services = req.query.services;
	const day = req.query.day;
	console.log("Doer-controller findByServicesAndDay services = " + services + " day = " + day);
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
	console.log("Doer-controller findByServicesAndDay services = " + services + " day = " + day);
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
	console.log("findByServicesAndDayDirect returning  " + data);
	return data;
}

async function updateAvailability(req, res) {
	const id = req.body.doer_id;
	const avail = req.body.availability;

	console.log("Doer-controller updateAvailability id = " + id);

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
	console.log("Doer-controller getHistory id = " + id);

	Doer.increment("rating", {
		by: 1,
		where: {
			doer_id: id,
		},
	});
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

	const completed_jobs_history = await CompletedJobs.findAll({
		where: { doer_id: id },
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

	const accepted_jobs_history = await AcceptedJobs.findAll({
		where: { doer_id: id },
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
