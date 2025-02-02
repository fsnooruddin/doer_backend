"use strict";

/**
 * @namespace Job
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doers = require("./doer.controller.js");
const Job = db.jobs;
const JobInvoices = db.invoices;
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
 * @param {string} job.location - Address of job, e.g. "[77.6879689, 27.4072289]"
 * @param {string} job.time - Time for job request, e.g. "Sun, 12-5"
 * @param {string} job.services - Services requested, e.g. "Electrician"
 * @return {string|null} error string - null if success, error details if failure
 * @memberof Job
 */
async function create(req, res) {
	logger.info("job-controller create ... body = " + JSON.stringify(req.body));

	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	try {
		// Save category in the database
		const response_data = await Job.create(data_obj);
		logger.info("job-controller create SUCCESS ... ");
		KU.sendMessage("doer_messages", "new job request");
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
	try {
		const sservices = "%" + services + "%";
		const sdays = "%" + dayRequested + "%";
		const doer_data = await Doers.findByServicesAndDayDBCall(sservices, sdays);
		if (doer_data) {
			if (doer_data.length == 0) {
				logger.warn("Found 0 Doers for services = " + services + " day = " + day);
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
		logger.error("job_request-controller findEligibleDoers missing jobId or job Id not integer: " + jobId);
		res.status(500).send("findEligibleDoers -- jobId was missing or job Id not integer: " + jobId);
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
	const data = await findByIdDBCall(jobId);

	if (data == null) {
		logger.warn("job_request-controller accept job -- couldn't find job with jobId = " + jobId);
		res.status(500).send("job accept failed   " + "couldn't find job " + jobId);
		return;
	}

	try {
		await data.update({ doer_id: doerId, status: "accepted" });
		logger.info("job_request-controller acceptJob SUCCESS, doerId = " + doerId + " job id = " + jobId);
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

	const data = await findByIdDBCall(jobId);

	if (data == null) {
		logger.warn("job_request-controller start job -- couldn't find job with jobId " + jobId);
		res.status(500).send("job start failed   " + "couldn't find job");
		return;
	}

	try {
		await data.update({ status: "in-progress" });
		logger.info("job_request-controller start job SUCCESS,  job id = " + jobId);
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
	const data = await findByIdDBCall(jobId);
	if (data == null) {
		logger.error("job_request-controller complete job -- couldn't find job with jobId " + jobId);
		res.status(200).send("job complete failed   " + "couldn't find job");
		return;
	}

	try {
		await data.update({ status: "completed" });
		logger.info("job_request-controller complete job SUCCESS --  jobId " + jobId);
		res.status(200).send("complete job success");
		return;
	} catch (error) {
		logger.error("job_request-controller complete job failed with error " + error);
		res.status(200).send("job complete failed   " + error.message);
		return;
	}
}

async function generateInvoice(req, res) {
	const job = await findByIdDBCall(req.query.jobId);
	console.log(job);
	const doer = await Doers.findByIdDBCall(job.doer_id);

	if (job == null || doer == null) {
		res.status(500).send({ message: "Error retrieving doer or job for job completion request, doer id = " + doerId + " job request id = " + jobReqId });
		return;
	}
	console.log("generating invoice job = " + JSON.stringify(job));
	console.log(typeof job);

	console.log("generating invoice doer = " + JSON.stringify(doer));
	console.log(typeof doer);

	var dayRequested = Utils.getDayFromAvailability(job.time);
	var timeRequested = Utils.getTimeFromAvailability(job.time);

	console.log(job.time);
	console.log(dayRequested);
	console.log(timeRequested);

	var objs = JSON.parse(doer.availability);
	console.log("availability = " + objs);
	console.log("availability = " + JSON.stringify(objs));
	console.log("one slot = " + JSON.stringify(objs.slots[0]));
	console.log("slots = " + JSON.stringify(JSON.parse(JSON.stringify(objs.slots[0]))));
	//console.log(JSON.parse (objs));
	var hourly_rate = Utils.getRateFromAvailabilitySlot(dayRequested, timeRequested, JSON.parse(JSON.stringify(objs.slots)));
	if (hourly_rate == -1) {
		res.status(500).send({
			message: "Error retrieving rate or  job completion request, doer id = " + job.doer_id,
		});
		return;
	}

	// Create a completed_job
	const cost = req.query.duration * hourly_rate;
	console.log("Doer-controller completeJob total cost is duration * rate: " + req.query.duration + " * " + hourly_rate);

	const job_invoice = {
		doer_id: job.doer_id,
		user_id: job.user_id,
		job_id: job.job_id,
		duration: req.query.duration,
		cost: cost,
		location: job.location,
	};

	console.log("invoive object is = " + JSON.stringify(job_invoice));

	// Save completed_job] in the database
	JobInvoices.create(job_invoice)
		.then((data) => {
			res.send(data);
			return;
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while generating the job invoice.",
			});
			return;
		});
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
