"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const AcceptedJobs = db.accepted_jobs;
const CompletedJobs = db.completed_jobs;
const JobRequest = db.job_requests;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");

// Create and Save a new Doer
async function create(req, res) {
	console.log("req body in create doer: ");
	console.log(req.body);

	const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));

	console.log("services = " + data_obj.services);
	console.log("services = " + JSON.stringify(data_obj.services));
    data_obj.services = JSON.stringify(data_obj.services);
    console.log("services = " + data_obj.services);
    data_obj.availability = JSON.stringify(data_obj.availability);
	const validation = doerCreateSchema.validate(data_obj);

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

try {
		// Save category in the database
		const response_data = await Doer.create(data_obj);
		res.status(200).send(response_data);
	} catch (err) {
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the Doer.",
		});
	}

}

// Find a single Doer with an id
function findById(req, res) {
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
				message:
					"Error retrieving Doer with id=" + id + " error: " + err.message,
			});
		});
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
				message:
					"Error retrieving Doer with services =" + services + " error: " + err.message,
			});
		});
}

function findByServicesAndDay(req, res) {
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
				message:
					"Error retrieving Doer with services =" + services + " error: " + err.message,
			});
		});
}

// Retrieve all Users from the database
// or only those whose title  matches
function acceptJob(req, res) {
	console.log("Doer-controller acceptJob");
	const doerId = req.query.doerId;
	const jobReqId = req.query.jobId;

	// Create a doer
	const accepted_job = {
		doer_id: doerId,
		job_request_id: jobReqId,
	};

	// Save doer in the database
	AcceptedJobs.create(accepted_job)
		.then((data) => {
			//Utils.add_to_nofications_queue("accepted_jobs", accepted_job);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while accepting the job.",
			});
		});
}

// Retrieve all Users from the database
// or only those whose title  matches
async function completeJob(req, res) {
	console.log("Doer-controller completeJob");
	const doerId = req.query.doerId;
	const jobReqId = req.query.jobId;
	const duration = req.query.duration;

	console.log("Doer-controller completeJob finding doerr");
	const doer = await Doer.findOne({ where: { doer_id: doerId } })
		.then((data) => {
			return data;
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error retrieving doer for rate with doer id=" +
					doerId +
					" error: " +
					err.message,
			});
		});

	const job_request = await JobRequest.findOne({
		where: { job_request_id: jobReqId },
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error retrieving job request id=" +
					jobReqId +
					" error: " +
					err.message,
			});
		});

	// Create a completed_job
	const cost = duration * doer.rate;
	console.log(
		"Doer-controller completeJob total cost is duration * rate: " +
			duration +
			" * " +
			doer.rate,
	);
	const completed_job = {
		doer_id: doerId,
		user_id: job_request.user_id,
		job_request_id: jobReqId,
		duration: duration,
		cost: cost,
	};

	// Save doer in the database
	CompletedJobs.create(completed_job)
		.then((data) => {
			//Utils.add_to_nofications_queue("completed_jobs", completed_job);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while completing the job.",
			});
		});
}

/*
exports.validateUserData = (data) => {

    console.log("Validating data: " + JSON.stringify(data));

    const data_obj = JSON.parse(Utils.escapeReturnString(JSON.stringify(data)));
    console.log("Validating data: " + data_obj);
    console.log("Validating data: " + typeof data_obj);
    const validation = schema.validate(data_obj);
  
    if(validation.error === undefined) {
        console.log("user schema validation succeeded");
        return null;
    } else {
        console.log("\t user schema validation failed");
        validation.error.details.forEach(element => {
            console.log("\treason: " + element.message + "\n");
        });
        validation_error = validation.error.details[0].message;
        console.log(validation.error.details[0].message);
        return validation.error.details[0].message;
    }

};


*/

async function rating(req, res) {
    const id = req.query.id;
	console.log("User-controller getHistory id = " + id);

    Doer.increment('rating', {
      by: 1,
      where: {
        doer_id: id
      }
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
				message:
					"Error retrieving doer for rate with doer id=" +
					doerId +
					" error: " +
					err.message,
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
				message:
					"Error retrieving completed_jobs for doer id=" +
					id +
					" error: " +
					err.message,
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
				message:
					"Error retrieving accepted_jobs for doer id=" +
					id +
					" error: " +
					err.message,
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
	findByServices,
	findByServicesAndDay,
	acceptJob,
	completeJob,
	getHistory,
	rating
};
