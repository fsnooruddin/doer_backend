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
	createJobRequestUrl,
	acceptJobUrl,
	startJobUrl,
	completeJobUrl,
	findEligibleDoersUrl
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

async function makeJobRequests() {
	var response_data = await rget(findEligibleDoersUrl + "?jobId=1001122");
	console.log("findEligibileDoers = \n\n\n" + JSON.stringify(response_data));

    var response_data = await rget(findEligibleDoersUrl);
	console.log("findEligibileDoers = \n\n\n" + JSON.stringify(response_data));

   var response_data = await rpost(acceptJobUrl + "?doerId=1&jobId=100000");
	console.log("acceptJob = \n\n\n" + JSON.stringify(response_data));

   var response_data = await rpost(acceptJobUrl + "?doerId=1");
	console.log("acceptJob = \n\n\n" + JSON.stringify(response_data));

var response_data = await rpost(acceptJobUrl + "?jobId=1");
	console.log("acceptJob = \n\n\n" + JSON.stringify(response_data));

var response_data = await rpost(startJobUrl + "?josssbId=100000");
console.log("startJob = \n\n\n" + JSON.stringify(response_data));

var response_data = await rpost(completeJobUrl + "?jobId=1000000");
console.log("completeJob = \n\n\n" + JSON.stringify(response_data));

var response_data = await rpost(completeJobUrl + "?josssbId=1000000");
console.log("completeJob = \n\n\n" + JSON.stringify(response_data));


	console.log("\n\n\n **************** \n\n\n");
}

async function makeCategoryRequests() {
var response_data = await rget(getCategoryByIdRequestUrl + "?id=1000000");
console.log("getCategoryByIdRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getCategoryByIdRequestUrl + "?ikkkkd=1000000");
console.log("getCategoryByIdRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getCategoryByNameRequestUrl + "?name=1000000");
console.log("getCategoryByNameRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getCategoryByNameRequestUrl + "?ikkkkd=1000000");
console.log("getCategoryByNameRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getCategoryTreeRequestUrl + "?id=1000000");
console.log("getCategoryTreeRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getCategoryTreeRequestUrl + "?ikkkkd=1000000");
console.log("getCategoryTreeRequestUrl = \n\n\n" + JSON.stringify(response_data));

}

async function makeDoerRequests() {
var response_data = await rget(getDoerByIdRequestUrl + "?id=1000000");
console.log("getDoerByIdRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getDoerByIdRequestUrl + "?issssd=1000000");
console.log("getDoerByIdRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getDoerByServicesRequestUrl + "?services=1000000");
console.log("getDoerByServicesRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getDoerByServicesRequestUrl + "?servijjjjces=1000000");
console.log("getDoerByServicesRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getDoerByServicesAndDayRequestUrl + "?services=elec&day=mon");
console.log("getDoerByServicesAndDayRequestUrl = \n\n\n" + JSON.stringify(response_data));

var response_data = await rget(getReviewByIdRequestUrl + "?id=elec");
console.log("getReviewByIdRequestUrl = \n\n\n" + JSON.stringify(response_data));

}

async function main() {
	makeJobRequests();
 makeCategoryRequests();
makeDoerRequests();

var response_data = await rget(getReviewByIdRequestUrl + "?id=soon");
console.log("getReviewByIdRequestUrl = \n\n\n" + JSON.stringify(response_data));


	console.log("\n\n\n **************** \n\n\n");
}

main();
