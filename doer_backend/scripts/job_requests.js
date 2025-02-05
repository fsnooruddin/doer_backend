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
	createJobRequestUrl,
	acceptJobUrl,
	startJobUrl,
	completeJobUrl,
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
	makeCreateCall("createJob", createJobRequestUrl, createJobRequest_1);
	console.log("\n\n\n **************** \n\n\n");

	var response_data;
	response_data = await rpost(acceptJobUrl  + "?doerId=1&jobId=1", null);
	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	response_data = await rpost(startJobUrl + "?jobId=1", null);
	console.log("startJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	response_data = await rpost(completeJobUrl + "?jobId=1&duration=3", null);
	console.log("completeJob " + " response = " + JSON.stringify(response_data));
	console.log("\n\n\n **************** \n\n\n");

	makeCreateCall("createJob", createJobRequestUrl, createJobRequest_2);
    	console.log("\n\n\n **************** \n\n\n");

    	var response_data;
    	response_data = await rpost(acceptJobUrl  + "?doerId=17&jobId=2", null);
    	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
    	console.log("\n\n\n **************** \n\n\n");

    	response_data = await rpost(startJobUrl + "?jobId=2", null);
    	console.log("startJob " + " response = " + JSON.stringify(response_data));
    	console.log("\n\n\n **************** \n\n\n");

    	response_data = await rpost(completeJobUrl + "?jobId=2&duration=5", null);
    	console.log("completeJob " + " response = " + JSON.stringify(response_data));
    	console.log("\n\n\n **************** \n\n\n");

 makeCreateCall("createJob", createJobRequestUrl, createJobRequest_3);
     	console.log("\n\n\n **************** \n\n\n");

     	var response_data;
     	response_data = await rpost(acceptJobUrl  + "?doerId=18&jobId=3", null);
     	console.log("acceptJob " + " response = " + JSON.stringify(response_data));
     	console.log("\n\n\n **************** \n\n\n");

     	response_data = await rpost(startJobUrl + "?jobId=3", null);
     	console.log("startJob " + " response = " + JSON.stringify(response_data));
     	console.log("\n\n\n **************** \n\n\n");

     	response_data = await rpost(completeJobUrl + "?jobId=3&duration=9", null);
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
