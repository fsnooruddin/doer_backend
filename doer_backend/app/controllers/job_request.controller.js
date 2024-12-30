"use strict";

const db = require("../models");
const utils = require("../utils/Utils.js");
const JobRequest = db.job_requests;
const request = require("superagent");
const Op = db.Sequelize.Op;
const KU = require("../utils/KafkaUtil.js");
//const { job_requestCreateSchema } = require('../schemas/job_request.js');
const Joi = require("joi");

// Create and Save a new Job Request
function create(req, res) {
	console.log("req body in create job_request: ");
	console.log(req.body);

	/*
    const data_obj = JSON.parse(utils.escapeJSONString(JSON.stringify(req.body)));
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

	// Create a doer
	const job_request = {
		user_id: req.body.user_id,
		time: req.body.time,
		location: req.body.location,
		services: req.body.services,
	};

	console.log("new job_request in create job_request: ");
	console.log(job_request);

	// Save doer in the database
	JobRequest.create(job_request)
		.then((data) => {
		    KU.sendMessage("doer_messages", "new job request");
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the job_request.",
			});
		});
}

// Find a single job_request with an id
function findById(req, res) {
	const id = req.query.id;
	console.log("job_request-controller findOne id = " + id);
	JobRequest.findOne({
		where: {
			job_request_id: id,
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
					"Error retrieving job_request with id=" +
					id +
					" error: " +
					err.message,
			});
		});
}

// Find a single Doer by services
function findByServices(req, res) {
	const services = req.query.services;
	console.log("job_request-controller findOne services = " + services);
	JobRequest.findAll({
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
					"Error retrieving job_request with id=" +
					id +
					" error: " +
					err.message,
			});
		});
}

function filterByTime(timeRequested, doers) {
    console.log("data in filterByTime= ");
    console.log(timeRequested);
    for (let d_entry of doers) {
     // console.log(d_entry);

      for (let a_entry of d_entry.availability) {
        console.log(a_entry);
      }
    }


}

async function getDoers(services, time) {
	const retArray = time.split(",");
	const day = retArray[0];
	const timeRequested = retArray[1];
	const uri =
		"http://localhost:8080/api/doer/getDoerByServicesAndDay?services=%Elect%&day=%Wed%";
	try {
		const doer_data = await request.get(uri);
		console.log("response data is " + JSON.stringify(doer_data.text));
		const response_data = filterByTime(timeRequested, JSON.parse(doer_data.text));
		return doer_data.text;
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

	const id = req.query.id;
	try {
		const data = await JobRequest.findOne({
			where: {
				job_request_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
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
	} catch (err) {
		res.status(500).send({
			message:
				"findEligibleDoers Error retrieving job_request with id=" +
				id +
				" error: " +
				err.message,
		});
	}
}

/*
exports.validateUserData = (data) => {

    console.log("Validating data: " + JSON.stringify(data));

    const data_obj = JSON.parse(utils.escapeReturnString(JSON.stringify(data)));
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

module.exports = {
	create,
	findEligibleDoers,
	getDoers,
};
