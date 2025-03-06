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
const logger = require("../utils/Logger.js");

/**
 * Start a Doer Trip for a job
 * @param {object} DoerTrip - JSON representing doer trip
 * @param {number} DoerTrip.job_id - ID of job for which the trip is being made
 * @param {number} DoerTrip.doer_id - Id of Doer doing the doer trip
 * @param {string} DoerTrip.description - Description of doer trip
 * @param {string} DoerTrip.address - Street address of job location
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
async function startDoerTrip(req, res) {
	logger.info("Doer Trip-controller create, body is: " + req.body);

	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	try {
		// Save DoerTrip in the database
		const response_data = await DoerTrip.create(data_obj);
		logger.info("Doer Trip-controller create data from create is " + response_data);
		res.status(200).send(response_data);
		return;
	} catch (err) {
		logger.error("Doer Trip-controller create, error from create is " + err.message);
		res.status(500).send({ message: err.message || "Some error occurred while creating the doer trip." });
		return;
	}
}

/**
 * Find Trips for Doer
 * @param {number} doerId - ID of Doer for whom to fetch trips
 * @return {string|null} Review - null if failure, JSON object representing doer trips if success
 * @memberof DoerTrip
 */
async function getDoerTripByDoerId(req, res) {
	const id = req.query.id;
	logger.info("DoerTrip-controller findOne id = " + id);
	try {
		const data = await DoerTrip.findAll({
			where: {
				doer_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
			include: [
				{
					model: DoerTripLocationUpdate,
					attributes: {
						exclude: ["updatedAt", "createdAt"],
					},
				},
			],
		});

		if (data == null) {
			logger.error("DoerTrip-controller couldn't find trip with doerId " + id);
			return null;
		}
		logger.info("doer-trip-controller findByDoerId -- doer id is " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Doer Trip-controller getDoerTripByDoerId -- error from  is " + err.message);
		res.status(500).send({
			message: "Error retrieving trips with Doer with id=" + id + " error: " + err.message,
		});
	}
}

/**
 * Update Doer Trip with a new location
 * @param {number} id - ID of Trip being updated
 * @param {number} location_update - Lat/Long of new position
 * @return {string|null} return - null if success, error message if failure
 * @memberof DoerTrip
 */
async function updateDoerTripLocation(req, res) {
	const id = req.body.id;

	logger.info("Doer Trip-controller updateDoerTripLocation id = " + id);

	const update = {
		doer_trip_id: id,
		location_update: req.body.location_update,
	};

	try {
		const data = await DoerTripLocationUpdate.create(update);
		logger.info("Doer Trip-controller updated location for DoerTrip id = " + id);
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Doer Trip-controller updated location for DoerTrip id = " + id + " Failed ... error is: " + err.message);
		res.status(500).send({ message: "Error updating location for trip with id =" + id + " error: " + err.message });
		return;
	}
}

/**
 * Find Trips for a Job
 * @param {number} jobId - ID of jobs for which to fetch trips
 * @return {string|null} Review - null if failure, JSON object representing doer trips if success
 * @memberof DoerTrip
 */
async function getDoerTripByJobId(req, res) {
	const id = req.query.jobId;
	if (id == null) {
		logger.error("Error retrieving doer trips by ID, job Id is missing");
		res.status(400).send({
			message: "Error retrieving doer trips by id, job Id is missing",
		});

		return;
	}
	logger.info("doer-trip-controller findById job id = " + id);
	logger.info(typeof id);
	logger.info(parseInt(id));

	if (isNaN(parseInt(id))) {
		logger.error("Error retrieving doer trips by ID, review Id is not integer, id = " + id);
		res.status(400).send({
			message: "Error retrieving doer trips by id, review Id is not integer",
		});

		return;
	}

	try {
		const data = await DoerTrip.findAll({
			where: {
				job_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
			include: [
				{
					model: DoerTripLocationUpdate,
					attributes: {
						exclude: ["updatedAt", "createdAt"],
					},
				},
			],
		});

		logger.info("doer-trip-controller findByJobId -- job id is " + id + " returning " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Error retrieving doer trips with job id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error retrieving doer trips with job id=" + id + " error: " + err.message,
		});
		return;
	}
}

/**
 * Complete a Doer Trip for a job
 * @param {number} id - Id of trip
 * @memberof DoerTrip
 */
async function completeDoerTrip(req, res) {
	const id = req.query.id;
	if (id == null) {
		logger.error("Complete Doer trip error, doer trip Id is missing");
		res.status(400).send({
			message: "Complete Doer trip error, doer trip Id is missing",
		});

		return;
	}
	logger.info("doer-trip-controller completeDoerTrip doer trip id = " + id);
	logger.info(typeof id);
	logger.info(parseInt(id));

	if (isNaN(parseInt(id))) {
		logger.error("Error completing doer trips by ID, trip Id is not integer, id = " + id);
		res.status(400).send({
			message: "Error completing doer trips by id, trip Id is not integer",
		});

		return;
	}

	try {
		const data = await DoerTrip.update({ status: "completed" }, { where: { doer_trip_id: id } });

		logger.info("doer-trip-controller completeDoerTrip -- DoerTrip id is " + id + " returning " + "success");
		res.status(200).send("success");
		return;
	} catch (err) {
		logger.error("Error completing doer trips with DoerTrip id=" + id + " error: " + err.message);
		res.status(500).send({
			message: "Error completing doer trips with DoerTrip id=" + id + " error: " + err.message,
		});
		return;
	}
}

module.exports = {
	startDoerTrip,
	updateDoerTripLocation,
	getDoerTripByJobId,
	getDoerTripByDoerId,
	completeDoerTrip,
};
