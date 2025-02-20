"use strict";

/**
 * @namespace Job
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doers = require("./doer.controller.js");
const Job = db.jobs;
const JobInvoices = db.invoices;
const JobHistories = db.job_histories;
const Op = db.Sequelize.Op;
const KU = require("../utils/KafkaUtil.js");
const logger = require("../utils/Logger.js");
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");
// https://www.zipcodeapi.com/rest/QZPX7dSqfyw89CJaAwX37gNO10EoQM2w7Op47UhhyTPB75eMlJPlDc5KkXz2mL0t/distance.json/94588/94104/km

/**
 * Create a Job
 * @param {object} job - JSON representing job
 * @param {number} job.user_id - User Id of user requesting the job
 * @param {string} job.description - Description of job
 * @param {string} job.location - Location ( coordinates )  of job, e.g.
 * ```
 * [77.6879689, 27.4072289]
 * ```
 * @param {string} job.time - Time for job request, [ day, startTime-endTime ]. e.g.
 * ```
 * Sun, 12-5
 * ```
 * @param {string} job.services - Services requested, e.g. "Electrician". Must correspond to a category in the system.
 * @return {string|null} error string - null if success, error details if failure
 *
 * @example
 * Sample payload:
 * {
 *    user_id: "11",
 *    location: "[77.6879689, 27.4072289]",
 *    time: "Sun, 12-5",
 *    services: "Electrician",
 *  }
 * @memberof Job
 */
async function create(req, res) {
	logger.info("job-controller create ... body = " + JSON.stringify(req.body));

	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	try {
		// Save category in the database
		const response_data = await Job.create(data_obj);
		logger.info("job-controller create SUCCESS ... ");
		KU.sendJobRequestedMessage(response_data.job_id, response_data.user_id, response_data.time, response_data.location, response_data.services);
		res.status(200).send(response_data);
	} catch (err) {
		logger.error("job-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Job.",
		});
		return;
	}
}

/**
 * Find a single Job with an id
 * @param {number} jobId - Job id to fetch
 * @memberof Job
 */
async function findById(req, res) {
	const id = req.query.JobId;
	if (id == null || isNaN(parseInt(jobId))) {
		logger.error("job-controller findById missing jobId or job Id not integer: " + jobId);
		res.status(500).send({ message: "Error retrieving job Id is missing  or job Id not integer " });
		return;
	}

	logger.info("job_request-controller findOne id = " + id);

	const data = await findByIdDBCall(id);
	if (data == null) {
		logger.warn("job-controller findById returing null, id = " + id);
		res.status(200).send("job find failed   " + id);
		return;
	} else {
		logger.debug("job-controller findById returing " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	}
}

// Find a single job_request with an id
async function findByIdDBCall(id) {
	try {
		const data = await Job.findOne({
			where: {
				job_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		await data;

		if (data == null) {
			logger.info("data from find job is = null, id = " + id);
			return null;
		} else {
			logger.debug("data from find job  from db is = " + JSON.stringify(data));
			return data;
		}
	} catch (error) {
		logger.error("Can't get job, id = " + id + " error message is: " + error.message);
		return null;
	}
}

function filterByDistance(timeRequested, doers) {
	const options = {
		method: "GET",
		hostname: "distance-calculator8.p.rapidapi.com",
		port: null,
		path: "/calc?startLatitude=-26.311960&startLongitude=-48.880964&endLatitude=-26.313662&endLongitude=-48.881103",
		headers: {
			"x-rapidapi-key": "b00a84708dmsh4a783e20708dbacp190650jsnae7c641c67d9",
			"x-rapidapi-host": "distance-calculator8.p.rapidapi.com",
		},
	};

	const req = http.request(options, function (res) {
		const chunks = [];

		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			const body = Buffer.concat(chunks);
			console.log(body.toString());
		});
	});

	req.end();
}

async function getDoers(services, time) {
	const retArray = time.split(",");
	const dayRequested = retArray[0];
	const timeRequested = retArray[1];
	logger.info("Finding Doers for services = " + services + " day = " + dayRequested + " time = " + timeRequested);
	try {
		const sservices = "%" + services + "%";
		const sdays = "%" + dayRequested + "%";
		const doer_data = await Doers.findByServicesAndDayDBCall(sservices, sdays);
		if (doer_data) {
			if (doer_data.length == 0) {
				logger.warn("Found 0 Doers for services = " + services + " day = " + dayRequested + " time = " + timeRequested);
				return null;
			}
			logger.debug("response data from getDoers is " + JSON.stringify(doer_data));
			logger.info("Found " + doer_data.length + " Doers for services + day ... filtering for time...");
			const response_data = await Utils.filterByTime(dayRequested, timeRequested, doer_data);
			logger.info("Doers left after filtering for time =  " + response_data.length);
			return response_data;
		} else {
			return null;
		}
	} catch (error) {
		logger.error("Can't get doers in getDoers...error is: " + error.message);
		return "Couldn't find any doers for given request";
	}
}

// Retrieve all Users from the database
// or only those whose title  matches
async function findEligibleDoers(req, res) {
	const id = req.query.jobId;
	if (id == null || isNaN(parseInt(id))) {
		logger.error("job_request-controller findEligibleDoers missing jobId or job Id not integer: " + id);
		res.status(500).send("findEligibleDoers -- jobId was missing or job Id not integer: " + id);
		return;
	}
	logger.info("job_request-controller findEligibleDoers, id = " + id);
	const data = await findByIdDBCall(id);
	logger.trace("data from find job request is = " + data + ", job id = " + id);
	if (data == null) {
		logger.warn("data from find job request is = null , job id = " + id);
		res.status(500).send("Couldn't find job request");
		return;
	}

	try {
		const response_data = await getDoers(data.services, data.time);
		logger.debug("findEligibleDoers returning: " + JSON.stringify(response_data));
		res.status(200).send(response_data);
		return;
	} catch (error) {
		logger.error("Can't get doers in findEligibleDoers...error is: " + error.message);
		res.status(500).send("Couldn't find doers   ");
		return;
	}
}

/**
 * Called by a Doer to accept a job.
 * @param {number} doerId - Doer accepting the job
 * @param {number} jobId - Job being accepted
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Job
 */
async function acceptJob(req, res) {
	const doerId = req.query.doerId;
	const jobId = req.query.jobId;

	if (jobId == null || isNaN(parseInt(jobId))) {
		logger.error("job_request-controller accept job missing job Id or job Id not integer: " + jobId);
		res.status(500).send({ message: "Error accepting Job - Job Id is missing or job id is not integer" });
		return;
	}

	if (doerId == null || isNaN(parseInt(doerId))) {
		logger.error("job_request-controller accept job missing doer Id or doer id is not integer: " + doerId);
		res.status(500).send({ message: "Error accepting Job - Doer Id is missing or not integer" });
		return;
	}

	logger.info("job_request-controller acceptJob, doerId = " + doerId + " job id = " + jobId);

	try {
		await Job.update({ doer_id: doerId, status: "accepted" }, { where: { job_id: jobId } });
		logger.info("job_request-controller acceptJob SUCCESS, doerId = " + doerId + " job id = " + jobId);
		updateJobHistory(jobId, "status", "accepted", "doer", doerId);
		res.status(200).send("accept job success");
		return;
	} catch (error) {
		logger.error("job_request-controller accept job failed with error " + error);
		res.status(500).send("job update failed   " + error);
		return;
	}
}

/**
 * Called by a Doer to start a job.
 * @param {number} jobId - Job being started
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Job
 */
async function startJob(req, res) {
	logger.info("job-controller startJob");
	const jobId = req.query.jobId;

	if (jobId == null || isNaN(parseInt(jobId))) {
		logger.error("job_request-controller start job, missing job Id or job Id not integer: " + jobId);
		res.status(500).send({ message: "Error starting Job - Job Id is missing or not integer" });
		return;
	}

	try {
		await Job.update({ status: "in-progress" }, { where: { job_id: jobId } });
		logger.info("job_request-controller start job SUCCESS,  job id = " + jobId);
		const data = await findByIdDBCall(jobId);
		if (data == null) {
			logger.warn("job-controller findById returing null, id = " + jobId);
			return;
		}
		updateJobHistory(jobId, "status", "started", "doer", data.doer_id);
		res.status(200).send("start job success");
		return;
	} catch (error) {
		logger.error("job_request-controller start job failed with error " + error);
		res.status(200).send("job start failed   " + error.message);
		return;
	}
}

/**
 * Called by a Doer to complete a job.
 * @param {number} jobId - Job being completed
 * @param {number} duration - How long the job took to complete
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Job
 */
async function completeJob(req, res) {
	const jobId = req.query.jobId;
	const duration = req.query.duration;

	if (jobId == null || isNaN(parseInt(jobId))) {
		logger.error("job_request-controller complete job,  missing job Id or job Id not integer: " + jobId);
		res.status(500).send({
			message: "Error completing Job - Job Id is missing or job Id not integer: " + jobId,
		});
		return;
	}
	if (duration == null || isNaN(parseInt(duration))) {
		logger.error("job_request-controller complete job,  missing duration or duration not integer: " + jobId);
		res.status(500).send({
			message: "Error completing Job - duration is missing or duration not integer: " + jobId,
		});
		return;
	}
	logger.info("job-controller completeJob, job id = " + jobId + " job complete duration is " + duration);

	try {
		await Job.update({ status: "completed", duration: duration }, { where: { job_id: jobId } });
		logger.info("job_request-controller complete job SUCCESS --  jobId " + jobId);
		const data = await findByIdDBCall(jobId);
		if (data == null) {
			logger.warn("job-controller findById returing null, id = " + jobId);
			return;
		}
		updateJobHistory(jobId, "status", "completed", "doer", data.doer_id);
		KU.sendJobCompletedMessage(data.job_id, data.doer_id, data.user_id, data.time, data.location, data.services, duration);
		res.status(200).send("complete job success");
		return;
	} catch (error) {
		logger.error("job_request-controller complete job failed with error " + error);
		res.status(200).send("job complete failed   " + error.message);
		return;
	}
}

async function generateInvoice(req, res) {
	const jobId = req.query.jobId;
	if (jobId == null || isNaN(parseInt(jobId))) {
		logger.error("job_request-controller generateInvoice,  missing job Id or job Id not integer: " + jobId);
		res.status(500).send({
			message: "Error generateInvoice - Job Id is missing or job Id not integer: " + jobId,
		});
		return;
	}

	logger.info("job-controller generateInvoice, job id = " + jobId);
	const job = await findByIdDBCall(jobId);
	const doer = await Doers.findByIdDBCall(job.doer_id);

	if (job == null || doer == null) {
		logger.error(
			"job_request-controller - generateInvoice -  Error retrieving doer or job for generate invoice request, doer id = " + doerId + " job id = " + jobId
		);
		res.status(500).send({
			message:
				"job_request-controller - generateInvoice - Error retrieving doer or job for generate invoice request, doer id = " +
				doerId +
				" job id = " +
				jobId,
		});
		return;
	}

	var dayRequested = Utils.getDayFromAvailability(job.time);
	var timeRequested = Utils.getTimeFromAvailability(job.time);

	console.log(job.time);
	console.log(dayRequested);
	console.log(timeRequested);

	var objs = JSON.parse(doer.availability);
	logger.info("Job-controlleravailability = " + objs);
	logger.info("Job-controller availability = " + JSON.stringify(objs));
	logger.info("Job-controller one slot = " + JSON.stringify(objs.slots[0]));
	logger.info("Job-controller slots = " + JSON.stringify(JSON.parse(JSON.stringify(objs.slots[0]))));
	//console.log(JSON.parse (objs));
	var hourly_rate = Utils.getRateFromAvailabilitySlot(dayRequested, timeRequested, JSON.parse(JSON.stringify(objs.slots)));
	if (hourly_rate == -1) {
		res.status(500).send({
			message: "Error retrieving rate or  job completion request, doer id = " + job.doer_id,
		});
		return;
	}

	// Create a completed_job
	const cost = job.duration * hourly_rate;
	logger.info("Job-controller Job-controller completeJob total cost is duration * rate: " + job.duration + " * " + hourly_rate);

	const job_invoice = {
		doer_id: job.doer_id,
		user_id: job.user_id,
		job_id: job.job_id,
		duration: job.duration,
		cost: cost,
		location: job.location,
	};

	logger.info("Job-controller Job-controller completeJob total cost is duration * rate: " + job.duration + " * " + hourly_rate);

	try {
		// Save completed_job] in the database

		const data = JobInvoices.create(job_invoice);
		logger.info("Job-controller Job-controller completeJob invoice create success: " + JSON.stringify(data));
		res.status(200).send(data);
		return;
	} catch (err) {
		logger.error("Job-controller Job-controller completeJob creating invoice failed. error =  " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while generating the job invoice.",
		});
		return;
	}
}

/**
 * Called by functions to record changes to job .
 * @param {number} jobId - Job being changed
 * @param {string} change_field - What field was changed
 * @param {string} change_value - Value of change
 * @param {string} changed_by - doer, user or admin
 * @param {number} changed_by_id - ID (doer_id, user_id, admin_id) of who made the change
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Job
 */
async function updateJobHistory(jobId, change_field, change_value, changed_by, changed_by_id) {
	logger.info("job-controller updateJobHistory");
	logger.warn(jobId + "   " + change_field + "   " + change_value + "   " + changed_by + "   " + changed_by_id);
	if (jobId == null || isNaN(parseInt(jobId))) {
		logger.error("job_request-controller updateJobHistory, missing job Id or job Id not integer: " + jobId);
		return false;
	}

	const entry = {
		job_id: jobId,
		change_field: change_field,
		change_value: change_value,
		changed_by: changed_by,
		changed_by_id: changed_by_id,
	};

	try {
		await JobHistories.create(entry);
		logger.info("job_request-controller updateJobHistory SUCCESS,  job id = " + jobId);
		return true;
	} catch (error) {
		logger.error("job_request-controller updateJobHistory failed with error " + error);
		return false;
	}
}

module.exports = {
	create,
	findEligibleDoers,
	getDoers,
	findById,
	findByIdDBCall,
	acceptJob,
	startJob,
	completeJob,
	generateInvoice,
};
