"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");

const DOER_AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2VySWQiOjQ5LCJ0eXBlIjoiZG9lciIsInVzZXJuYW1lIjoiQmlsbHlIaWxsIiwiaWF0IjoxNzQyNTI5MDQzfQ.Tj3RsARAP9huj5qiMIabSVC-OTEt7Q2R2mAp4nF7ZQ4";

async function rpost(url, dataString) {
   const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': DOER_AUTH_TOKEN
      }
   };

	const response = await axios.post("http://127.0.0.1:8080/api/doer/doer/create", dataString, config);

	return response.data;
}

// Find a single Doer by services
async function createDoer(entry) {
	var uri = "http://127.0.0.1:8080/api/doer/doer/create";

	try {
		//  console.log("create Doer entry = " + JSON.stringify(entry));
		const response_data = await rpost(uri, entry);

		// console.log("response.body     " + response_data);
		console.log("\n\n createDoer response = " + JSON.stringify(response_data) + "\n\n");
		return true;
	} catch (error) {
		console.log("Couldn't create Doer..." + JSON.stringify(entry));
		console.error(error);
		return false;
	}
}

async function main() {
	// Accessing command line arguments in Node.js

	const args = process.argv.slice(2);

	console.log("args = ");
	console.log(args);
	if (args.length == 0) {
		console.log("Doer data Filename required ... ");
		return;
	}
	let rawdata = fs.readFileSync(args[0]);
	let doer_data = JSON.parse(rawdata);

	console.log(JSON.stringify(doer_data));

	for (let i = 0; i < doer_data.doers.length; i++) {
		var entry = doer_data.doers[i];
		//entry.minimum_charges = entry.min_charges;
		createDoer(entry);
	}

}

main();
