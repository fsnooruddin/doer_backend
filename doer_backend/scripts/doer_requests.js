"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");
var {
	createJobRequest_1,
	createDoerTrip_1,
	updateDoerTrip_1,
	updateDoerTrip_2,
	updateDoerTrip_3,
	createDoerReview_1,
	createDoerReview_2,
	updateDoerAvailability_1,
} = require("./other_requests_data.js");

var {
	getDoerByIdRequestUrl,
	getDoerByServicesRequestUrl,
	getDoerByServicesAndDayRequestUrl,
	getReviewsForDoerRequestUrl,
	getReviewByIdRequestUrl,
	rateDoerRequestUrl,
	createDoerReviewUrl,
	createDoerTripUrl,
	updateDoerTripUrl,
	completeDoerTripUrl,
	updateDoerAvailabilityUrl,
} = require("./test_urls.js");

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
	makeCreateCall("createDoerReview", createDoerReviewUrl, createDoerReview_1);
	console.log("\n\n\n **************** \n\n\n");

	makeCreateCall("createDoerReview", createDoerReviewUrl, createDoerReview_2);
	console.log("\n\n\n **************** \n\n\n");

	makeCreateCall("createDoerTrip", createDoerTripUrl, createDoerTrip_1);
	console.log("\n\n\n **************** \n\n\n");

	makeCreateCall("updateDoerTrip", updateDoerTripUrl, updateDoerTrip_1);
	console.log("\n\n\n **************** \n\n\n");

    makeCreateCall("updateDoerTrip", updateDoerTripUrl, updateDoerTrip_2);
	console.log("\n\n\n **************** \n\n\n");

    makeCreateCall("updateDoerTrip", updateDoerTripUrl, updateDoerTrip_3);
	console.log("\n\n\n **************** \n\n\n");

	var response_data = await rpost( completeDoerTripUrl + "?id=1");
    	console.log("\n\n\n completeDoerTrip **************** \n\n\n");

	var response_data = await rpost(rateDoerRequestUrl + "?id=2&rating=5");
	console.log("rateDoerRequestUrl = \n\n\n" + JSON.stringify(response_data));

	response_data = await rpost(updateDoerAvailabilityUrl + "?id=2", updateDoerAvailability_1);
	console.log(" updateDoerAvailabilityUrl = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
}

async function makeGetRequests() {
	var response_data = await rget(getDoerByIdRequestUrl + "?id=2");
	console.log("getDoerById = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
	var response_data = await rget(getDoerByServicesRequestUrl + "?services=%elec%");
	console.log("getDoerByServices = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
	var response_data = await rget(getDoerByServicesAndDayRequestUrl + "?services=%elec%&day=%sat%");
	console.log("getDoerByServicesAndDay = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
	var response_data = await rget(getReviewsForDoerRequestUrl + "?doerId=2");
	console.log("getReviewsForDoer = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");

	console.log("\n\n\n **************** \n\n\n");
	var response_data = await rget(getReviewByIdRequestUrl + "?id=2");
	console.log("getReviewById = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
}

async function main() {
	makePostRequests();
	makeGetRequests();
}

main();
