"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Doer = db.doers;
const AcceptedJobs = db.accepted_jobs;
const StartedJobs = db.started_jobs;
const CompletedJobs = db.completed_jobs;
const Job = db.job_requests;
const Op = db.Sequelize.Op;
const { doerCreateSchema, doerGetSchema } = require("../schemas/doer.js");
const Joi = require("joi");

// Create and Save a new Doer
async function create(req, res) {
  console.log("req body in create doer: ");
  console.log(req.body);

  const data_obj = JSON.parse(Utils.escapeJSONString(JSON.stringify(req.body)));
  //const data_obj_1 = JSON.parse(Utils.escapeJSONString(data_obj.availability));

  console.log("services = " + data_obj.services);
  console.log("services = " + JSON.stringify(data_obj.services));

  data_obj.availability = JSON.stringify(data_obj.availability);
 console.log("availability = " + data_obj.availability);
  console.log("slots = " + JSON.stringify(data_obj.availability.slots));

/*

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

  try {
    // Save category in the database
    const response_data = await Doer.create(data_obj);
    res.status(200).send(response_data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Doer.",
    });
  }
}

// Find a single Doer with an id
function findById(req, res) {
  const id = req.query.id;
  console.log("Doer-controller findOne id = " + id);
  if(id == null) {
    res.status(500).send({
            message:
              "Error retrieving Doer Id is missing"
          });

    return;
  }

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
          "Error retrieving Doer with services =" +
          services +
          " error: " +
          err.message,
      });
    });
}

function findByServicesAndDay(req, res) {
  const services = req.query.services;
  const day = req.query.day;
  console.log(
    "Doer-controller findByServicesAndDay services = " +
      services +
      " day = " +
      day,
  );
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
          "Error retrieving Doer with services =" +
          services +
          " error: " +
          err.message,
      });
    });
}

async function findByServicesAndDayDirect(services, day) {
  console.log(
    "Doer-controller findByServicesAndDay services = " +
      services +
      " day = " +
      day,
  );
  let data = null;
  try {
    data = await Doer.findAll({
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
    });
  } catch (err) {
    console.log(
      "Error retrieving Doer with services =" +
        services +
        " error: " +
        err.message,
    );
    return null;
  }
  console.log("findByServicesAndDayDirect returning  " + data);
  return data;
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
      console.log("accept-job success!")
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
function startJob(req, res) {
  console.log("Doer-controller startJob");
  const doerId = req.query.doerId;
  const jobReqId = req.query.jobId;

  // Create a doer
  const started_job = {
    doer_id: doerId,
    job_request_id: jobReqId
  };

  // Save doer in the database
  StartedJobs.create(started_job)
    .then((data) => {
      //Utils.add_to_nofications_queue("accepted_jobs", accepted_job);
      console.log("started_job success!")
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while starting the job.",
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
  var rdoer;
  var jrequest;
  try {
    rdoer = await Doer.findOne({
      where: { doer_id: doerId }
    });
  } catch (err) {
    console.log(
      "Error retrieving doer for rate with doer id=" +
        doerId +
        " error: " +
        err.message,
    );
  }

  try {
    jrequest = await Job.findOne({
      where: { job_request_id: jobReqId },
      attributes: ["user_id", "time"],
    });
  } catch (err) {
    console.log(
      "Error retrieving job request id=" + jobReqId + " error: " + err.message,
    );
  }

  if(jrequest == null || rdoer == null){
     res.status(500).send({
            message:
              "Error retrieving doer or job for job completion request, doer id = " +
              doerId +
              " job request id = " +
              jobReqId
          });
          return;
  }
  console.log("completing job = " + JSON.stringify(jrequest));
  console.log(typeof jrequest);

  console.log("doer completing job = " + JSON.stringify(rdoer));
  console.log(typeof rdoer);


  var dayRequested = Utils.getDayFromAvailability(jrequest.time);
  var timeRequested = Utils.getTimeFromAvailability(jrequest.time);

  console.log(jrequest.time);
  console.log(dayRequested);
  console.log(timeRequested);

  var objs = JSON.parse(rdoer.availability);
		console.log ("availability = " + objs);
		console.log ("availability = " + JSON.stringify(objs));
		console.log ("one slot = " + JSON.stringify(objs.slots[0]));
		console.log ("slots = " + JSON.stringify(JSON.parse(JSON.stringify(objs.slots[0]))));
		//console.log(JSON.parse (objs));
		var hourly_rate = Utils.getRateFromAvailabilitySlot(dayRequested, timeRequested, JSON.parse(JSON.stringify(objs.slots)));
		if (hourly_rate == -1) {
			 res.status(500).send({
                        message:
                          "Error retrieving rate or  job completion request, doer id = " +
                          doerId

                      });
                      return;
		}


  // Create a completed_job
  const cost = duration * hourly_rate;
  console.log(
    "Doer-controller completeJob total cost is duration * rate: " +
      duration +
      " * " +
      hourly_rate,
  );


  const completed_job = {
    doer_id: doerId,
    user_id: jrequest.user_id,
    job_request_id: jobReqId,
    duration: duration,
    cost: cost,
  };

  // Save completed_job] in the database
  CompletedJobs.create(completed_job)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while completing the job.",
      });
    });
}

async function updateAvailability(req, res) {
  const id = req.body.doer_id;
  const avail = req.body.availability;

  console.log("Doer-controller updateAvailability id = " + id);

var doer = {};
try {
 doer = await Doer.findOne({
    where: { doer_id: id },
    attributes: { exclude: ["updatedAt", "createdAt"] },
  });
    } catch(err)
     {
      res.status(500).send({
        message:
          "Error retrieving doer for rate with doer id=" +
          id +
          " error: " +
          err.message,
      });
      return;
      };

    if(doer == null) {
        res.status(200).send("couldn't update doer availability. Couldn't find doer with id = " + id);
        return;
    }
console.log("result of get doer in update avail = " + JSON.stringify(doer));
    doer.availability = JSON.stringify(avail);
    doer.changed('availability', true);
  const result = await doer.save();
  console.log("result of save doer in update avail = " + JSON.stringify(result));
   res.status(200).send("successfully update doer availability. doer id = " + id);
}

async function rating(req, res) {
  const id = req.query.id;
  console.log("Doer-controller getHistory id = " + id);

  Doer.increment("rating", {
    by: 1,
    where: {
      doer_id: id,
    },
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
  findByServicesAndDayDirect,
  acceptJob,
  startJob,
  completeJob,
  getHistory,
  rating,
  updateAvailability
};
