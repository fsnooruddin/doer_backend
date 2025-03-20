var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

var global_jobId = null;
var global_userId = null;
var global_doerId = null;
var global_jobId2 = null;
var global_jobId3 = null;
var global_userToken = null;
var global_doerToken = null;

const global_modules = {};


const fs = require("fs");
const path = require("path");

var test_uris = require("./data/test.uris.js");


async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

function loadModules(directoryPath) {
	const absolutePath = path.resolve(directoryPath); // Get absolute path
	//console.log(absolutePath);
	fs.readdirSync(absolutePath).forEach((file) => {
		const filePath = path.join(absolutePath, file);
		const fileStat = fs.statSync(filePath);
		//	console.log(filePath);
		if (fileStat.isFile() && path.extname(file) === ".js") {
			const moduleName = path.basename(file, ".js");
			global_modules[moduleName] = require(filePath);
		}
	});
	// Accessing loaded modules
	for (const moduleName in global_modules) {
		if (global_modules.hasOwnProperty(moduleName)) {
			//	console.log(`Loaded module: ${moduleName}`);
			// Use loadedglobal_modules[moduleName] to access the module's exports
		}
	}
	//	console.log(global_modules["address.test.data"].reqCreateAddress_1);
}


beforeAll(() => {
	//	console.log("before all");
	const currentWorkingDirectory = process.cwd();
	//console.log(`Current working directory: ${currentWorkingDirectory}`);

	loadModules("./data");

});

var test_uris = require("./data/test.uris.js");


let globalAddressId = "";

describe("ADDRESS API Tests -- POSITIVE TESTS", () => {
	test("Create a new address", async () => {
	    console.log()
		const res = await request.post(test_uris.createAddressUri).send(global_modules["address.test.data"].reqCreateAddress_1).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("address_id");
		globalAddressId = res.body.address_id;
	});

	test("Update a new address", async () => {
		const res = await request
			.post(test_uris.updateAddressUri + "?id=" + globalAddressId)
			.send()
			.set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
	});

	test("Remove a new address", async () => {
		const res = await request
			.post(test_uris.removeAddressByIdUri + "?id=" + globalAddressId)
			.send()
			.set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
	});
});
