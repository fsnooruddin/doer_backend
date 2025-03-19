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
} = require("./other_requests_data.js");

var {
	createJobUri,
	acceptJobUri,
	startJobUri,
	completeJobUri,
	cancelJobUri,
	abandonJobUri,
	addCostToJobUri
} = require("./test.uris.js");

async function rget(Uri) {
	try {
	    var str_url = "http://localhost:8080/api/doer" + Uri;
		const response = await axios.get(str_url);
		return response.data;
	} catch (error) {
		console.error("GET from : " + str_url + " error is: " + error);
		return null;
	}
}

async function rpost(Uri, dataString) {
	try {
	    var str_url = "http://localhost:8080/api/doer" + Uri;
		const response = await axios.post(str_url, dataString);
		return response.data;
	} catch (error) {
		console.error("POST to : " + str_url + " error is: " + error);
		return null;
	}
}

async function makeCreateCall(endpoint, Uri, entry) {
	try {
		console.log("create " + endpoint + "  Uri  " + Uri + " entry = " + JSON.stringify(entry));
		const response_data = await rpost(Uri, entry);

		console.log(endpoint + " response = " + JSON.stringify(response_data));
		return true;
	} catch (error) {
		console.log("Couldn't update " + endpoint + " ..." + JSON.stringify(entry));
		console.error(error);
		return false;
	}
}

async function makePostRequests() {
	await makeCreateCall("createJob", createJobUri, createJobRequest_1);
	console.log("\n\n\n **************** \n\n\n");

	var response_data;
	response_data = await rpost(acceptJobUri  + "?doerId=1&jobId=1", null);
	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	response_data = await rpost(startJobUri + "?jobId=1", null);
	console.log("startJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	response_data = await rpost(completeJobUri + "?jobId=1&duration=3", null);
	console.log("completeJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	await makeCreateCall("createJob", createJobUri, createJobRequest_2);
    	console.log("\n\n\n **************** \n\n\n");

    	var response_data;
    	response_data = await rpost(acceptJobUri  + "?doerId=1&jobId=2", null);
    	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
    	console.log("\n\n\n **************** \n\n\n");

    	response_data = await rpost(startJobUri + "?jobId=2", null);
    	console.log("startJob " + " response = " + JSON.stringify(response_data));
    	console.log("\n\n\n **************** \n\n\n");

    	response_data = await rpost(completeJobUri + "?jobId=2&duration=5", null);
    	console.log("completeJob " + " response = " + JSON.stringify(response_data));
    	console.log("\n\n\n **************** \n\n\n");

 await makeCreateCall("createJob", createJobUri, createJobRequest_3);
     	console.log("\n\n\n **************** \n\n\n");

     	var response_data;
     	response_data = await rpost(acceptJobUri  + "?doerId=18&jobId=3", null);
     	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
     	console.log("\n\n\n **************** \n\n\n");

     	response_data = await rpost(startJobUri + "?jobId=3", null);
     	console.log("startJob " + " response = " + JSON.stringify(response_data));
     	console.log("\n\n\n **************** \n\n\n");

     	response_data = await rpost(completeJobUri + "?jobId=3&duration=9", null);
     	console.log("completeJob " + " response = " + JSON.stringify(response_data));
     	console.log("\n\n\n **************** \n\n\n");

        return;
}

async function makeGetRequests() {
	var response_data = await rget("/job/findEligibleDoers?jobId=1");
	console.log("findEligibileDoers = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");

	return;
}

async function main() {
	await makePostRequests();
	await makeGetRequests();

	console.log("\n\n\n **************** \n\n\n");

	return;
}

main();
