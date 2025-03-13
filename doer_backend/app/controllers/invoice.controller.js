"use strict";

const db = require("../models");
const Utils = require("../utils/Utils.js");
const Invoice = db.invoices;
const JobCost = db.job_costs;
const Op = db.Sequelize.Op;
const logger = require("../utils/Logger.js");
const Job = db.jobs;
const Doer = db.doers;

async function generateInvoice(req, res) {
	const jobId = req.query.jobId;

	if (Utils.validateIntegerParam("Job Id", jobId) == false) {
		logger.error("invoice-controller generateInvoice missing job Id or job Id not integer: " + jobId);
		res.status(400).send({ message: "Error generateInvoice - Job Id is missing or job id is not integer" });
		return;
	}

	logger.info("invoice-controller generateInvoice, = " + jobId);

	const job = await Job.findByPk(jobId);
	console.log(JSON.stringify(job));
	if (job == null) {
		logger.error("invoice-controller generateInvoice couldn't find job with job Id : " + jobId);
		res.status(400).send({ message: "Error generateInvoice - couldn't find job with job Id : " + jobId });
		return;
	}

	var dayRequested = job.day;
	var timeRequested = job.req_time;

	const doer = await Doer.findOne({
		where: {
			doer_id: job.doer_id,
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
		],
	});

	if (doer == null) {
		logger.error("invoice-controller generateInvoice couldn't find doer with doer Id : " + job.doer_id);
		res.status(400).send({ message: "Error generateInvoice - couldn't find doer with doer Id : " + job.doer_id });
		return;
	}
	var hourly_rate = Utils.getRateFromAvailabilitySlot(dayRequested, timeRequested, JSON.parse(JSON.stringify(doer.availability_slots)));
	if (hourly_rate == -1) {
		res.status(400).send({
			message: "Error retrieving rate or  job completion request, doer id = " + job.doer_id,
		});
		return;
	}

	// Create a completed_job
	var cost = job.duration * hourly_rate;

    let cost_obj = {
        job_id: jobId,
        cost: cost,
        description: "job cost for " + job.duration + " hours, rate was " + hourly_rate
    }
    console.log(JSON.stringify(cost_obj));
    try {
    		const new_cost = await JobCost.create(cost_obj);
    		logger.info("Invoice-controller generateInvoice new cost for job id = " + jobId + " is "  + JSON.stringify(new_cost));
    	} catch (err) {
    	logger.error("Invoice-controller generateInvoice error adding new cost for job id = " + jobId + " error: " + err.message);
    		res.status(500).send({
    			message: "Invoice-controller generateInvoice error adding new cost for job id = " + jobId + " error: " + err.message,
    		});
    	}
	// get additional costs
	const additional_costs = await JobCost.findAll({
		where: {
			job_id: jobId
		},
	});

	logger.info("Job-controller Job-controller generateInvoice job cost is duration * rate: " + job.duration + " * " + hourly_rate);

	console.log("additional costs " + JSON.stringify(additional_costs));

for (let i = 0; i < additional_costs.length; i++) {
		let a_entry = additional_costs[i];
		logger.trace("adding additional costs = " + a_entry.cost + " description " + a_entry.description);
		cost = a_entry.cost + cost;
		}

logger.info("Job-controller Job-controller generateInvoice total cost is " + cost);

	const job_invoice = {
		doer_id: job.doer_id,
		user_id: job.user_id,
		job_id: job.job_id,
		duration: job.duration,
		cost: cost,
	};

	logger.info("new invoice = " + JSON.stringify(job_invoice));

	try {
		// Save new invoice in the database

		const new_invoice = await Invoice.create(job_invoice);
		logger.info("Job-controller Job-controller completeJob invoice create success: " + JSON.stringify(new_invoice));
		res.status(200).send(new_invoice);
		return;
	} catch (err) {
		logger.error("Job-controller Job-controller completeJob creating invoice failed. error =  " + err.message);
		res.status(400).send("Job-controller Job-controller completeJob creating invoice failed. error =  " + err.message);
		return;
	}
}

async function addCostToJob(req, res) {
	const id = req.query.id;
	logger.info("Invoice-controller addCostToJob id = " + id);
	try {
		const new_cost = await JobCost.create({});
		logger.info("Invoice-controller addCostToJob id = " + id + "  returning " + JSON.stringify(new_cost));
		res.status(200).send(new_cost);
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving addCostToJob for invoice id=" + id + " error: " + err.message,
		});
	}
}

async function addTipToJob(req, res) {
	const id = req.query.id;
	logger.info("Invoice-controller addCostToJob id = " + id);
	try {
		const new_cost = await JobCost.create({});
		logger.info("Invoice-controller addCostToJob id = " + id + "  returning " + JSON.stringify(new_cost));
		res.status(200).send(new_cost);
	} catch (err) {
		res.status(500).send({
			message: "Error retrieving addCostToJob for invoice id=" + id + " error: " + err.message,
		});
	}
}

async function approveInvoice(req, res) {
}

async function rejectInvoice(req, res) {
}

async function sendInvoiceForApproval(req, res) {
}

module.exports = {
	generateInvoice,
	addCostToJob,
	addTipToJob,
};
