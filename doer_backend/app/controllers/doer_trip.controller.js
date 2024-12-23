"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const DoerTrip = db.doer_trips;
const DoerTripLocationUpdate = db.doer_trip_location_updates;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");

// Create and Save a new Doer Trip
function create(req, res) {
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

	// Save doer in the database
	DoerTrip.create(data_obj)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the doer trip.",
			});
		});
}

// Find a single Doer with an id
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
				message:
					"Error retrieving Doer with id=" + id + " error: " + err.message,
			});
		});
}

async function updateDoerTripLocation(req, res) {
	const id = req.body.id;

	console.log("Doer Trip-controller updateDoerTripLocation id = " + id);

	const update = {
		doer_trip_id: id,
		location_update: req.body.location_update,
	};

	const doer = await DoerTripLocationUpdate.create(update)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					"Error updating location for trip with id =" +
					id +
					" error: " +
					err.message,
			});
		});
}

module.exports = {
	create,

	updateDoerTripLocation,
};
