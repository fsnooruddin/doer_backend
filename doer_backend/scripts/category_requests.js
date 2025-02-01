"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");

const getCategoryByIdRequestUrl = "http://127.0.0.1:8080/api/doer/getCategoryById";
const getCategoryByNameRequestUrl = "http://127.0.0.1:8080/api/doer/getCategoryByName";
const getCategoryTreeRequestUrl = "http://127.0.0.1:8080/api/doer/getCategoryTree";

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
	var response_data = await rget(getCategoryByIdRequestUrl + "?id=1");
	console.log("getCategoryById = \n\n\n" + JSON.stringify(response_data));

	var response_data = await rget(getCategoryByNameRequestUrl + "?name=electrician");
	console.log("getCategoryById = \n\n\n" + JSON.stringify(response_data));

    var response_data = await rget(getCategoryTreeRequestUrl + "?id=8");
	console.log("getCategoryTreeRequestUrl = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
}

async function main() {

	makeGetRequests();

	console.log("\n\n\n **************** \n\n\n");
}

main();
