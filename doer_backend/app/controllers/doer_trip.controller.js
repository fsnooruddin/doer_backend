"use strict";

/**
 * @namespace DoerTrip
 */


const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const DoerTrip = db.doer_trips;
const DoerTripLocationUpdate = db.doer_trip_location_updates;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");
const logger = require("../utils/Logger.js");

/**
 * Start a Doer Trip for a job
 * @param {object} DoerTrip - JSON representing doer trip
 * @param {number} DoerTrip.job_id - ID of job for which the trip is being made
 * @param {number} DoerTrip.doer_id - Id of Doer doing the doer trip
 * @param {string} DoerTrip.description - Description of doer trip
 * @param {string} DoerTrip.address - Street address of job location
 * @param {number} DoerTrip.eta - ETA of Doer
 * @param {number} DoerTrip.eta - ETA of Doer
 *
 * @example
 * Sample payload:
  {
     doer_id: "1",
     job_id: "1",
     description: "Trip to fix sink",
     address: "Flat NO 121 MG road ",
     eta: "22:22",
   }
 * @memberof DoerTrip
 */
function startDoerTrip(req, res) {
	console.log("req body in create Doer Trip: ");
	console.log(req.body);

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

	// Save DoerTrip in the database
	DoerTrip.create(data_obj)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the doer trip.",
			});
		});
}

/**
 * Find Trips for Doer
 * @param {number} doerId - ID of Doer for whom to fetch trips
 * @return {string|null} Review - null if failure, JSON object representing doer trips if success
 * @memberof DoerTrip
 */
function findByDoerId(req, res) {
	const id = req.query.id;
	console.log("Doer-controller findOne id = " + id);
	Doer.findOne({
		where: {
			doer_id: id,
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
				message: "Error retrieving Doer with id=" + id + " error: " + err.message,
			});
		});
}

/**
 * Update Doer Trip with a new location
 * @param {number} Id - ID of Trip being updated
 * @return {string|null} return - null if success, error message if failure
 * @memberof DoerTrip
 */
async function updateDoerTripLocation(req, res) {
	const id = req.body.id;

	console.log("Doer Trip-controller updateDoerTripLocation id = " + id);

	const update = {
		doer_trip_id: id,
		location_update: req.body.location_update,
	};

	const doer = await DoerTripLocationUpdate.create(update)
		.then((data) => {
			console.log("Doer Trip-controller updated location for DoerTrip id = " + id);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating location for trip with id =" + id + " error: " + err.message,
			});
		});
}

/**
 * Find Trips for a Job
 * @param {number} jobId - ID of jobs for which to fetch trips
 * @return {string|null} Review - null if failure, JSON object representing doer trips if success
 * @memberof DoerTrip
 */
function getDoerTripByJobId(req, res) {
	const id = req.query.jobId;
	if (id == null) {
		logger.error("Error retrieving doer trips by ID, job Id is missing");
		res.status(500).send({
			message: "Error retrieving doer trips by id, job Id is missing",
		});

		return;
	}
	logger.info("doer-trip-controller findById job id = " + id);
	console.log(typeof id);
	console.log(parseInt(id));

	if (isNaN(parseInt(id))) {
		logger.error("Error retrieving doer trips by ID, review Id is not integer, id = " + id);
		res.status(500).send({
			message: "Error retrieving doer trips by id, review Id is not integer",
		});

		return;
	}

	DoerTrip.findAll({
		where: {
			job_id: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
	})
		.then((data) => {
			logger.info("doer-trip-controller findByJobId -- job id is " + id + " returning " + data);
			res.status(200).send(data);
			return;
		})
		.catch((err) => {
			logger.error("Error retrieving doer trips with job id=" + id + " error: " + err.message);
			res.status(500).send({
				message: "Error retrieving doer trips with job id=" + id + " error: " + err.message,
			});
			return;
		});
}

/**
 * Complete a Doer Trip for a job
 * @param {number} id - Id of trip
 * @memberof DoerTrip
 */
function completeDoerTrip(req, res) {
	const id = req.query.id;
	if (id == null) {
		logger.error("Complete Doer trip error, doer trip Id is missing");
		res.status(500).send({
			message: "Complete Doer trip error, doer trip Id is missing",
		});

		return;
	}
	logger.info("doer-trip-controller completeDoerTrip doer trip id = " + id);
	console.log(typeof id);
	console.log(parseInt(id));

	if (isNaN(parseInt(id))) {
		logger.error("Error completing doer trips by ID, trip Id is not integer, id = " + id);
		res.status(500).send({
			message: "Error completing doer trips by id, trip Id is not integer",
		});

		return;
	}

	DoerTrip.update( {status: "completed"}, { where: {doer_trip_id: id} } )
		.then((data) => {
			logger.info("doer-trip-controller completeDoerTrip -- DoerTrip id is " + id + " returning " + "success");
			res.status(200).send("success");
			return;
		})
		.catch((err) => {
			logger.error("Error completing doer trips with DoerTrip id=" + id + " error: " + err.message);
			res.status(500).send({
				message: "Error completing doer trips with DoerTrip id=" + id + " error: " + err.message,
			});
			return;
		});
}

module.exports = {
	startDoerTrip,
	updateDoerTripLocation,
	getDoerTripByJobId,
	completeDoerTrip
};
