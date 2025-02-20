"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");

var {
createJobRequest_1,
  createJobRequest_2,
  createJobRequest_3,
  createDoerTrip_1,
  updateDoerTrip_1,
  createDoerReview_1,
  createDoerReview_2,
  updateDoerAvailability_1,
  createMessage_1,
  createMessage_2,
  createUser_1,
  createUser_2,
  createUser_3
} = require("./other_requests_data.js");

var {
	getCategoryByIdRequestUrl,
	getCategoryByNameRequestUrl,
	getCategoryTreeRequestUrl,
	getDoerByIdRequestUrl,
	getDoerByServicesRequestUrl,
	getDoerByServicesAndDayRequestUrl,
	getReviewsForDoerRequestUrl,
	getReviewByIdRequestUrl,
	rateDoerRequestUrl,
	createDoerReviewUrl,
	createDoerTripUrl,
	completeDoerTripUrl,
	updateDoerTripUrl,
	getDoerTripByJobIdUrl,
	updateDoerAvailabilityUrl,
	createJobRequestUrl,
	createDoerTripUrl,
	updateDoerTripUrl,
	createDoerReviewUrl,
	acceptJobUrl,
	startJobUrl,
	completeJobUrl,
	updateDoerAvailabilityUrl,
	findEligibleDoersUrl,
	createMessageUrl,
	getMessageByIdUrl,
	getMessageByJobIdUrl,
	createUserUrl
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

console.log(createUserUrl);
makeCreateCall("createUser", createUserUrl, createUser_1);
    	console.log("\n\n\n **************** \n\n\n");

    		makeCreateCall("createUser", createUserUrl, createUser_2);
        	console.log("\n\n\n **************** \n\n\n");

	makeCreateCall("createUser", createUserUrl, createUser_3);
        	console.log("\n\n\n **************** \n\n\n");


	makeCreateCall("createJob", createJobRequestUrl, createJobRequest_1);
	console.log("\n\n\n **************** \n\n\n");

		makeCreateCall("createJob", createJobRequestUrl, createJobRequest_2);
    	console.log("\n\n\n **************** \n\n\n");

	makeCreateCall("createMessage", createMessageUrl, createMessage_1);
	console.log("\n\n\n **************** \n\n\n");

    makeCreateCall("createMessage", createMessageUrl, createMessage_2);
	console.log("\n\n\n **************** \n\n\n");



}




async function main() {
	makePostRequests();

	console.log("\n\n\n **************** \n\n\n");
}

main();
