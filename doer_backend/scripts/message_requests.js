"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");
var {
	createMessage_1,
  	createMessage_2
} = require("./other_requests_data.js");

var {
	createMessageUrl,
	getMessageByIdUrl,
	getMessageByJobIdUrl
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
	makeCreateCall("createMessage", createMessageUrl, createMessage_1);
	console.log("\n\n\n **************** \n\n\n");

    makeCreateCall("createMessage", createMessageUrl, createMessage_2);
	console.log("\n\n\n **************** \n\n\n");

}

async function makeGetRequests() {
	var response_data = await rget(getMessageByIdUrl + "?id=6");
	console.log("getMessageByIdUrl = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");

	var response_data = await rget(getMessageByJobIdUrl + "?jobId=2");
	console.log("getMessageByJobIdUrl = \n\n\n" + JSON.stringify(response_data));

	console.log("\n\n\n **************** \n\n\n");
}


async function main() {
	makePostRequests();
	makeGetRequests();

	console.log("\n\n\n **************** \n\n\n");
}

main();
