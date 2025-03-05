"use strict";

/**
 * @namespace Doer
 */

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const Job = db.jobs;
const Invoice = db.invoices;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const logger = require("../utils/Logger.js");
const Availability = db.availability_slots;
const Rating = db.ratings;
const { sql } = require("@sequelize/core");
const jobs = require("./job.controller.js");

/**
 * Create a Doer
 * @param {object} doer - JSON representing Doer
 * @param {string} doer.name - Name of Doer
 * @param {string} doer.phone_number - Phone number of Doer
 * @param {string} doer.location - Address of doer, e.g.
 * ```
 * "{city: Union City ,state: CA,zip_code: 94587,address: ['2837 Whipple Rd', 'Ste A', 'Union City , CA 94587'],coordinates: {'latitude': 37.6059449, 'longitude': -122.0708683}}"
 * ```
 * @param {string} doer.services - Services offered by Doer (these are categories). E.g. "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]"
 * @param {string} doer.availability - Array of timeslots when Doer is available. e.g.
 *
 * ```
 * [
 *      {
 *           "day": "Fri",
 *           "time": "10-13",
 *           "rate": 99,
 *           "location": "94588"
 *       },
 *       {
 *           "day": "Sat",
 *           "time": "9-17",
 *           "rate": 80,
 *           "location": "94588"
 *       }
 *   ]
 * ```
 * @param {number} doer.rating - Current Rating of Doer
 * @param {number} doer.minimum_charges - Minimum the Doer will charge for any service
 * @param {string} doer.img_url - URL for Doer
 * @return {string|null} error string - null if success, error details if failure
 * @example
 * Sample Payload:
 *  {
 *      "doer_id": 2,
 *      "name": "TD West Electric",
 *      "phone_number": "(510) 342-2818",
 *      "location": "{city: Union City ,state: CA,zip_code: 94587,address: ['2837 Whipple Rd', 'Ste A', 'Union City , CA 94587'],coordinates: {'latitude': 37.6059449, 'longitude': -122.0708683}}",
 *      "services": "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
 *      "availability": "[{\"day\":\"Fri\",\"time\":\"10-13\",\"rate\":99,\"location\":\"94588\"},{\"day\":\"Sat\",\"time\":\"9-17\",\"rate\":80,\"location\":\"94588\"}]",
 *      "rating": 5.8,
 *      "minimum_charges": 97,
 *      "img_url": "https://s3-media2.fl.yelpcdn.com/bphoto/NLxw4Bt_7-clB1mIm0n31Q/o.jpg"
 *  }
 * @memberof Doer
 */
async function create(req, res) {
	if (req.body == null) {
		logger.error("doer-controller create call missing payload");
		res.status(500).send({
			message: "Error creating Doer, data is missing",
		});

		return;
	}

	// First, we start a transaction and save it into a variable
	const transaction = await db.sequelize.transaction();

	var data_obj;
	try {
		logger.info("req body in create doer: " + JSON.stringify(req.body));
		//data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));
		data_obj = JSON.parse(JSON.stringify(req.body));
	} catch (err) {
		logger.error("error parsing json + " + err.message);
		res.status(500).send("Error parsing json body. error = " + err.message);
		return;
	}

	try {
		// Save Doer in the database
		const new_doer = await Doer.create(data_obj, { transaction });
		console.log(JSON.stringify(new_doer));
		let nObj = {};
		for (let i = 0; i < Object.keys(data_obj.availability.slots).length; i++) {
			nObj = data_obj.availability.slots[i];
			nObj.doer_id = new_doer.doer_id;
			console.log(JSON.stringify(nObj));
			// create availability windows.
			let avail_obj = await Availability.create(nObj, { transaction });
			logger.info("Create Doer ... add availability success ... " + JSON.stringify(avail_obj));
		}
		nObj = {};
		nObj = data_obj.rating;
		nObj.doer_id = new_doer.doer_id;
		console.log(JSON.stringify(nObj));
		let rating_obj = await Rating.create(nObj, { transaction });
		logger.info("Create Doer ... add rating success ... " + JSON.stringify(rating_obj));

		// all done, commit transaction, return success
		transaction.commit();
		res.status(200).send(new_doer);
		return;
	} catch (err) {
		await transaction.rollback();
		logger.error("doer-controller create call failed. error = " + err.message);
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Doer.",
		});
		return;
	}
}

/**
 * Find a single Doer with an id
 * @param {number} id - Doer Id of doer to retreive
 * @return {string|null} Doer - null if failure, JSON object representing Doer if success
 * @memberof Doer
 */
async function findById(req, res) {
	const id = req.query.id;

	if (id == null) {
		logger.error("doer-controller findById missing doerId");
		res.status(500).send({
			message: "Error retrieving Doer Id is missing",
		});

		return;
	}

	logger.info("Doer-controller findOne id = " + id);
	const data = await findByIdDBCall(id);

	if (data == null) {
		logger.error("doer-controller findById couldn't find doer with doerId " + id);
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
			include: [
				{
					model: db.availability_slots,
					attributes: {
						exclude: ["updatedAt", "createdAt"],
					},
				},
				{
					model: db.ratings,
					as: "ratings",
					attributes: {
						exclude: ["updatedAt", "createdAt"],
					},
				},
			],
		});

		if (data == null) {
			logger.error("doer-controller findByIdDBCall couldn't find doer with doerId " + id);
			return null;
		}

		return data;
	} catch (err) {
		logger.error("doer-controller findByIdDBCall couldn't find doer with doerId " + id + "with error " + err.message);
		return null;
	}
}

/**
 * Find Doers by services offered
 * @param {string} services - Services to search by
 * @return {string|null} Doer - null if failure, JSON array object representing Doers offering services if success
 * @memberof Doer
 */
function findByServices(req, res) {
	var services = req.query.services;
	if (services == null || services.trim() === "") {
		logger.error("doer-controller findByServices -- services is null or empty!");
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + " malformed input params.",
		});
		return;
	}

	services = "%" + services + "%";
	logger.info("Doer-controller findOne services = " + services);

	try {
		const response_data = Doer.findAll({
			where: { services: { [Op.iLike]: services } },
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
			include: db.availability_slots,
		});

		logger.info("doer-controller findByServices -- services is " + services + " returning " + JSON.stringify(response_data));
		res.status(200).send(response_data);
		return;
	} catch (err) {
		logger.error("doer-controller findByServices -- services is " + services + " error is " + err.message);
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + " error: " + err.message,
		});
	}
}

/**
 * Find Doers by services offered AND availability on given day
 * @param {string} services - Services to search by
 * @param {string} day - Day on which Doer should have availability
 * @return {string|null} Doer - null if failure, JSON array object representing Doers offering services if success
 * @memberof Doer
 */

async function findByServicesAndDay(req, res) {
	var services = req.query.services;
	var day = req.query.day;
	if (services == null || services.trim() === "" || day == null || day.trim() === "") {
		logger.error("doer-controller findByServicesAndDay -- services or day is null!");
		res.status(500).send({
			message: "Error retrieving Doer with services =" + services + ", day: " + day + " malformed input params.",
		});
		return;
	}

	services = "%" + services + "%";
	day = "%" + day + "%";
	logger.info("Doer-controller findByServicesAndDay services = " + services + ", day = " + day);

	let doers_found = {};
	try {
		doers_found = await findByServicesAndDayDBCall(services, day);
		logger.info("doer-controller findByServicesAndDay -- services is " + services + " returning " + JSON.stringify(doers_found));
		res.status(200).send(doers_found);
		return;
	} catch (err) {
		logger.error("doer-controller findByServicesAndDay -- services is " + services + " error is " + err.message);
		res.status(500).send({
			message: "Error retrieving Doer with findByServicesAndDay =" + services + " error: " + err.message,
		});
		return;
	}
}

async function findByServicesAndDayDBCall(services, day) {
	logger.info("Doer-controller findByServicesAndDayDBCall services = " + services + " day = " + day);

	/*
SELECT  "doer_trip"."doer_trip_id",
                  "doer_trip"."description"
                  FROM "doer_trips" AS "trips"
                  INNER JOIN
                  "doer_trip_location_updates" ON "trips"."doer_trip_id" = "doer_trip_location_updates"."doer_trip_id" AND
"trips"."doer_id" = “1";

*/

	var doers_found = {};
	try {
		doers_found = await db.sequelize.query(
			`SELECT  "doer"."doer_id",
                     "doer"."name",
                     "doer"."phone_number",
                     "doer"."location",
                     "doer"."services",
                     "doer"."minimum_charges",
                     "doer"."img_url"

                     FROM "doers" AS "doer"
                     INNER JOIN
                     "availability_slots" ON "doer"."doer_id" = "availability_slots"."doer_id"
                     AND
                     "doer"."services" ILIKE :svcs
                     AND
                     "availability_slots"."day" ILIKE :day`,
			{
				replacements: { svcs: services, day: day },
			}
		);

		for (let i = 0; i < doers_found[0].length; i++) {
			var doer_slots = {};
			console.log("FOUND DOERS >>>>>");
			//		logger.info("doer-controller findByServicesAndDayDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));

			doer_slots = await Availability.findAll({
				where: {
					doer_id: doers_found[0][i].doer_id,
				},
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			});
			//	logger.info("doer-controller findByServicesAndDayDBCall -- availability " + JSON.stringify(doer_slots));
			doers_found[0][i].availability = doer_slots;
			logger.info("doer-controller findByServicesAndDayDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));
		}
	} catch (err) {
		logger.error("doer-controller findByServicesAndDayDBCall -- services is " + services + " error is " + err.message);
		return null;
	}

	logger.info("doer-controller findByServicesAndDayDBCall -- SUCCESS returning SIZE: " + doers_found[0].length);
	return doers_found[0];
}

async function findByServicesDayAndTimeDBCall(services, day, rstart, end) {
	logger.info("Doer-controller findByServicesDayAndTimeDBCall services = " + services + " day = " + day);

	var doers_found = {};
	try {
		doers_found = await db.sequelize.query(
			`SELECT  "doer"."doer_id",
                     "doer"."name",
                     "doer"."phone_number",
                     "doer"."location",
                     "doer"."services",
                     "doer"."minimum_charges",
                     "doer"."img_url"

                     FROM "doers" AS "doer"
                     INNER JOIN
                     "availability_slots" ON "doer"."doer_id" = "availability_slots"."doer_id"
                     AND
                     "doer"."services" ILIKE :svcs
                     AND
                     "availability_slots"."day" ILIKE :day
                     AND
                     "availability_slots"."end_time" > :rstart
                     `,
			{
				replacements: { svcs: services, day: day, rstart: rstart },
			}
		);

		for (let i = 0; i < doers_found[0].length; i++) {
			var doer_slots = {};
			console.log("FOUND DOERS >>>>>");
			//		logger.info("doer-controller findByServicesAndDayDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));

			doer_slots = await Availability.findAll({
				where: {
					doer_id: doers_found[0][i].doer_id,
				},
				attributes: {
					exclude: ["updatedAt", "createdAt"],
				},
			});
			//	logger.info("doer-controller findByServicesAndDayDBCall -- availability " + JSON.stringify(doer_slots));
			doers_found[0][i].availability = doer_slots;
			logger.info("doer-controller findByServicesDayAndTimeDBCall -- SUCCESS returning: " + JSON.stringify(doers_found[0][i]));
		}
	} catch (err) {
		logger.error("doer-controller findByServicesDayAndTimeDBCall -- services is " + services + " error is " + err.message);
		return null;
	}

	logger.info("doer-controller findByServicesDayAndTimeDBCall -- SUCCESS returning SIZE: " + doers_found[0].length);
	return doers_found[0];
}

async function findForJob(req, res) {
	var id = req.query.jobId;

	var job_to_fill = await jobs.findByIdDBCall(id);
	if (job_to_fill == null) {
		logger.error("doer-controller findForJob -- can't find job with id = " + id);
		res.status(500).send({
			message: "Error retrieving Job findForJob -- can't find job with id = " + id,
		});
		return;
	}
	console.log(JSON.stringify(job_to_fill));
	var services = "%" + job_to_fill.services + "%";
	var day = job_to_fill.day;
	var doers_found = await findByServicesDayAndTimeDBCall(services, day, job_to_fill.req_time);

	// filter by distance
	var ret_arry = [];
	try {
		for (var i = 0; i < doers_found.length; i++) {
			var doer = doers_found[i];
			console.log("doer 0 = " + JSON.stringify(doer));
			console.log("doer 1 = " + JSON.stringify(doer.availability));

			for (var j = 0; j < doer.availability.length; j++) {
				console.log("doer 2 = " + JSON.stringify(doer.availability[j]));
				var d_radius = doer.availability[j].radius;

				var dist = Utils.getDistanceBetweenTwoPoint(
					job_to_fill.latitude,
					job_to_fill.longitude,
					doer.availability[j].latitude,
					doer.availability[j].longitude
				);
				logger.info("distance between job and doer id = " + doer.doer_id + " is " + dist);
				if (dist < d_radius) {
					ret_arry.push(doer);
					logger.info(" doer id = " + doer.doer_id + " is within range");
					break;
				} else {
					logger.info(" doer id = " + doer.doer_id + " is out of range");
				}
			}
		}
		res.status(200).send(ret_arry);
		return;
	} catch (err) {
		logger.error("doer-controller findByServicesAndDay -- services is " + services + " error is " + err.message);
		res.status(500).send({
			message: "Error retrieving Doer with findByServicesAndDay =" + services + " error: " + err.message,
		});
	}
}
/**
 * Update Availability of a Doer
 * @param {number} id - ID of Doer to update
 * @param {string} availability - String representing new Availability JSON structure
 *
 * @example
 * Sample payload:
 * [
 *      {
 *           "day": "Fri",
 *           "time": "10-13",
 *           "rate": 99,
 *           "location": "94588"
 *       },
 *       {
 *           "day": "Sat",
 *           "time": "9-17",
 *           "rate": 80,
 *           "location": "94588"
 *       }
 *   ]
 * @memberof Doer
 */
async function updateAvailability(req, res) {
	const id = req.query.id;
	const avail = req.body.availability;

	if (id == null) {
		logger.error("doer-controller updateAvailability missing doerId");
		res.status(500).send({
			message: "Error updateAvailability Doer Id is missing",
		});

		return;
	}

	if (avail == null) {
		logger.error("doer-controller updateAvailability availability is missing or empty");
		res.status(500).send({
			message: "Error updateAvailability availabilty is missing or empty",
		});

		return;
	}

	logger.info("Doer-controller updateAvailability id = " + id + " avail = " + avail);

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
	logger.info("result of get doer in update avail = " + JSON.stringify(doer));
	doer.availability = JSON.stringify(avail);
	doer.changed("availability", true);
	const result = await doer.save();
	logger.info("result of save doer in update avail = " + JSON.stringify(result));
	res.status(200).send("successfully update doer availability. doer id = " + id);
}

/**
 * Rate a Doer
 * @param {number} id - ID of Doer being rated
 *
 * @memberof Doer
 */
// TODO
async function rating(req, res) {
	const id = req.query.id;
	if (id == null || isNaN(parseInt(id))) {
		logger.error("doer-controller rating missing doerId or doerId not integer " + id);
		res.status(500).send({
			message: "Error rating Doer Id is missing or doerId not integer " + id,
		});

		return;
	}
	if (req.query.rating == null || isNaN(parseInt(req.query.rating))) {
		logger.error("doer-controller rating missing rating or rating not integer: " + req.query.rating);
		res.status(500).send({
			message: "doer-controller rating missing rating or rating not integer: " + req.query.rating,
		});
		return;
	}
	logger.info("Doer-controller rating doer id = " + id + "   rating = " + req.query.rating);

	try {
		var currentRating = await Rating.findOne({
			where: {
				doer_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		console.log(JSON.stringify("current rating = " + currentRating));
		let new_rating = {};
		if (currentRating == null || Object.keys(currentRating).length === 0) {
			new_rating = await Rating.create({ doer_id: id, total: req.query.rating, count: 1 });
		} else {
			let new_total = parseInt(currentRating.total) + parseInt(req.query.rating);
			let new_count = parseInt(currentRating.count) + 1;
			new_rating = await currentRating.update({ total: new_total, count: new_count });
		}
		logger.error("doer-controller rate doer success rating doer with doerId: " + id + " rating: " + JSON.stringify(new_rating));
		res.status(200).send(new_rating);
	} catch (err) {
		logger.error("doer-controller rate doer error rating doer with doerId: " + id + " error: " + err.message);
		res.status(500).send("failure to rate doer with id = " + id + " ... error is: " + err.message);
		return;
	}
}

async function getRating(req, res) {
	const id = req.query.id;
	if (id == null || isNaN(parseInt(id))) {
		logger.error("doer-controller getRating missing doerId or doerId not integer " + id);
		res.status(500).send({
			message: "Error getRating Doer Id is missing or doerId not integer " + id,
		});

		return;
	}

	try {
		var currentRating = await Rating.findOne({
			where: {
				doer_id: id,
			},
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
		console.log(JSON.stringify("current rating = " + currentRating));
		if (currentRating == null || Object.keys(currentRating).length === 0) {
			res.status(500).send({ message: "doer-controller getRating for doer Error retrieving rating doer id=" + id });
			return;
		}
		logger.error("doer-controller rate doer success rating doer with doerId: " + id + " rating: " + JSON.stringify(currentRating));
		res.status(200).send(currentRating);
	} catch (err) {
		logger.error("doer-controller get rating for doer error rating doer with doerId: " + id + " error: " + err.message);
		res.status(500).send("failure to get rating doer with id = " + id + " ... error is: " + err.message);
		return;
	}
}
// TODO
async function getHistory(req, res) {
	const id = req.query.id;
	logger.info("Doer-controller getHistory id = " + id);

	var doer = null;
	var completed_jobs = null;
	var accepted_jobs = null;
	var invoices = null;
	try {
		doer = await Doer.findOne({
			where: { doer_id: id },
			attributes: { exclude: ["updatedAt"] },
		});
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving doer for doer getHistory = " + id + " error: " + err.message,
		});
	}

	try {
		invoices = Invoice.findAll({ where: { doer_id: id } });
		logger.info("Doer-controller getHistory invoices =  = " + JSON.stringify(invoices));
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving invoices for doer getHistory = " + id + " error: " + err.message,
		});
	}

	try {
		completed_jobs = await Job.findAll({
			where: { doer_id: id, status: "completed" },
			attributes: { exclude: ["updatedAt"] },
		});
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving completed jobs for doer getHistory = " + id + " error: " + err.message,
		});
	}

	try {
		accepted_jobs = await Job.findAll({
			where: { doer_id: id, status: "accepted" },
			attributes: { exclude: ["updatedAt"] },
		});
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving accepted jobs for doer getHistory = " + id + " error: " + err.message,
		});
	}

	const history = {
		doer_profile: doer,
		completed_jobs: completed_jobs,
		accepted_jobs: accepted_jobs,
	};

	res.status(200).send(history);
}

// TODO
async function getUpcomingJobs(req, res) {
	const id = req.query.id;
	logger.info("Doer-controller getUpcomingJobs id = " + id);
	try {
		const accepted_jobs = await Job.findAll({
			where: { doer_id: id, status: "accepted" },
			attributes: { exclude: ["updatedAt"] },
		});
		logger.info("Doer-controller getUpcomingJobs id = " + id + "  returning " + JSON.stringify(accepted_jobs));
		res.status(200).send(accepted_jobs);
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving accepted_jobs for doer id=" + id + " error: " + err.message,
		});
	}
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
	getUpcomingJobs,
	getRating,
	findForJob,
};
