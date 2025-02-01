"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");
var {
	createJobRequest_1,
	createDoerTrip_1,
	updateDoerTrip_1,
	createDoerReview_1,
	createDoerReview_2,
	updateDoerAvailability_1,
} = require("./other_requests_data.js");

const createJobRequestUrl = "http://127.0.0.1:8080/api/doer/createJob";
const createDoerTripUrl = "http://127.0.0.1:8080/api/doer/createDoerTrip";
const updateDoerTripUrl = "http://127.0.0.1:8080/api/doer/updateDoerTripLocation";
const createDoerReviewUrl = "http://127.0.0.1:8080/api/doer/reviewDoer";
const acceptJobUrl = "http://127.0.0.1:8080/api/doer/acceptJob?doerId=1&jobId=1";
const startJobUrl = "http://127.0.0.1:8080/api/doer/startJob?doerId=1&jobId=1";
const completeJobUrl = "http://127.0.0.1:8080/api/doer/completeJob?doerId=1&jobId=4&duration=22";
const updateDoerAvailabilityUrl = "http://127.0.0.1:8080/api/doer/updateDoerAvailability";

async function rget(url) {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("GET from : " + url + " error is: " + error);
		return null;
	}
}

async function rpost(url, dataString) {
	try {
		const response = await axios.post(url, dataString);
		return response.data;
	} catch (error) {
		console.error("POST to : " + url + " error is: " + error);
		return null;
	}
}

async function makeCreateCall(endpoint, url, entry) {
	try {
		console.log("create " + endpoint + "  url  " + url + " entry = " + JSON.stringify(entry));
		const response_data = await rpost(url, entry);

		console.log(endpoint + " response = " + JSON.stringify(response_data));
		return true;
	} catch (error) {
		console.log("Couldn't update " + endpoint + " ..." + JSON.stringify(entry));
		console.error(error);
		return false;
	}
}

async function makePostRequests() {
	makeCreateCall("createJob", createJobRequestUrl, createJobRequest_1);
	console.log("\n\n\n **************** \n\n\n");

	var response_data;
	response_data = await rpost(acceptJobUrl, null);
	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	response_data = await rpost(startJobUrl, null);
	console.log("startJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	response_data = await rpost(completeJobUrl, null);
	console.log("completeJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");
}

async function makeGetRequests() {
	var response_data = await rget("http://127.0.0.1:8080/api/doer/findEligibleDoers?jobId=1");
	console.log("findEligibileDoers = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
}

async function main() {
	makePostRequests();
	makeGetRequests();

	console.log("\n\n\n **************** \n\n\n");
}

main();
