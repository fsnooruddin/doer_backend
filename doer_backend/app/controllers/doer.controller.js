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
function create(req, res) {
	console.log("req body in create doer: ");
	console.log(req.body);

	const data_obj = JSON.parse(
		Utils.escapeJSONString(JSON.stringify(req.body)),
	);
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

	// Create a doer
	const doer = {
		name: req.body.name,
		phone_number: req.body.phone_number,
		address: req.body.address,
		services: req.body.services,
		availability: req.body.availability,
		rating: req.body.rating,
		rate: req.body.rate,
	};

	console.log("new doer in create doer: ");
	console.log(doer);

	// Save doer in the database
	Doer.create(doer)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the doer.",
			});
		});
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
					"Error retrieving Doer with id=" +
					id +
					" error: " +
					err.message,
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
				message:
					"Error retrieving Doer with id=" +
					id +
					" error: " +
					err.message,
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
			Utils.add_to_nofications_queue("accepted_jobs", accepted_job);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while accepting the job.",
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
			Utils.add_to_nofications_queue("completed_jobs", completed_job);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while completing the job.",
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


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
    console.log("User-controller findOne id = " + id);

};
*/

module.exports = {
	create,
	findById,
	findByServices,
	acceptJob,
	completeJob,
};
