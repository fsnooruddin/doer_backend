"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doers = require("./doer.controller.js");
const Job = db.jobs;
const JobInvoices = db.invoices;
const Op = db.Sequelize.Op;
const KU = require("../utils/KafkaUtil.js");
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");
// https://www.zipcodeapi.com/rest/QZPX7dSqfyw89CJaAwX37gNO10EoQM2w7Op47UhhyTPB75eMlJPlDc5KkXz2mL0t/distance.json/94588/94104/km


// Create and Save a new Job Request
function create(req, res) {
	console.log("req body in create job_request: ");
	console.log(req.body);
	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	// Save doer in the database
	Job.create(data_obj)
		.then((data) => {
			KU.sendMessage("doer_messages", "new job request");
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the job_request.",
			});
		});
}

// Find a single job_request with an id
async function findById(req, res) {
	const id = req.query.JobId;
	console.log("job_request-controller findOne id = " + id);
	if (id == null) {
		res.status(500).send({
			message: "Error retrieving Job Job Id is missing",
		});
		return;
	}

	const data = await findByIdDBCall(id);
	if (data == null) {
		res.status(200).send("job find failed   " + id);
		return;
	} else {
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
		console.log("data from find request from db is = " + data);
		if (data == null) {
			console.log("data from find request is = null " + id);
			return null;
		} else {
			return data;
		}
	} catch (error) {
		console.log("Can't get job..." + error.message);
		return null;
	}
}

// Find a single Doer by services
function findByServices(req, res) {
	const services = req.query.services;
	console.log("job_request-controller findOne services = " + services);
	Job.findAll({
		where: {
			services: {
				[Op.like]: services,
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
				message: "Error retrieving job_request with id=" + id + " error: " + err.message,
			});
		});
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
				console.log("Found 0 Doers for services = " + services + " day = " + day);
			}
			console.log("response data is " + JSON.stringify(doer_data));
			const response_data = await Utils.filterByTime(dayRequested, timeRequested, doer_data);
			return response_data;
		} else {
			return null;
		}
	} catch (error) {
		console.log("Can't get doers...");
		console.error(error);
		return "Couldn't find any doers for given request";
	}
}

// Retrieve all Users from the database
// or only those whose title  matches
async function findEligibleDoers(req, res) {
	console.log("job_request-controller findEligibleDoers");

	const id = req.query.jobId;
	const data = await findByIdDBCall(id);
		console.log("data from find request is = " + data);
		if (data == null) {
			console.log("data from find request is = null " + data);
			res.status(200).send("Couldn't find job request");
			return;
		}

		try {
			const response_data = await getDoers(data.services, data.time);
			res.status(200).send(response_data);
			return;
		} catch (error) {
			console.log("Can't get doers...");
			res.status(200).send("Couldn't find doers   ");
			return;
		}
}

// Retrieve all Users from the database
// or only those whose title  matches
async function acceptJob(req, res) {
	console.log("job_request-controller acceptJob");
	const doerId = req.query.doerId;
	const jobId = req.query.jobId;

	if (jobId == null) {
		res.status(500).send({
			message: "Error accepting Job - Job Id is missing",
		});
		return;
	}

	if (doerId == null) {
		res.status(500).send({
			message: "Error accepting Job - Doer Id is missing",
		});
		return;
	}

	const data = await findByIdDBCall(jobId);

	if (data == null) {
		res.status(200).send("job accept failed   " + "couldn't find job");
		return;
	}

	try {
		await data.update({ doer_id: doerId, status: "accepted" });
		res.status(200).send("accept job success");
		return;
	} catch (error) {
		console.log("Job update failed...");
		res.status(200).send("job update failed   ");
		return;
	}
}

// Retrieve all Users from the database
// or only those whose title  matches
async function startJob(req, res) {
	console.log("job-controller startJob");
	const jobId = req.query.jobId;

	if (jobId == null) {
		res.status(500).send({
			message: "Error starting Job - Job Id is missing",
		});
		return;
	}

	const data = await findByIdDBCall(jobId);

	if (data == null) {
		res.status(200).send("job start failed   " + "couldn't find job");
		return;
	}

	try {
		await data.update({ status: "in-progress" });
		res.status(200).send("start job success");
		return;
	} catch (error) {
		console.log("Job update failed...");
		res.status(200).send("job start failed   " + error.message);
		return;
	}
}

// Retrieve all Users from the database
// or only those whose title  matches
async function completeJob(req, res) {
	console.log("job-controller completeJob");
	const jobId = req.query.jobId;

	if (jobId == null) {
		res.status(500).send({
			message: "Error completing Job - Job Id is missing",
		});
		return;
	}

	const data = await findByIdDBCall(jobId);
	if (data == null) {
		res.status(200).send("job complete failed   " + "couldn't find job");
		return;
	}

	try {
		await data.update({ status: "completed" });
		res.status(200).send("complete job success");
		return;
	} catch (error) {
		console.log("Job update failed...");
		res.status(200).send("job complete failed   " + error.message);
		return;
	}
}


async function generateInvoice(req, res) {

    const job = await findByIdDBCall(req.query.jobId);
    console.log(job);
    const doer = await Doers.findByIdDBCall(job.doer_id);

	if (job == null || doer == null) {
		res.status(500).send({
			message: "Error retrieving doer or job for job completion request, doer id = " + doerId + " job request id = " + jobReqId,
		});
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
		location: job.location
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
	generateInvoice
};
