const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const fs = require("fs");
const path = require("path");

var global_badgeId = null;
var global_userId = null;
const global_modules = {};
function loadModules(directoryPath) {
	const absolutePath = path.resolve(directoryPath); // Get absolute path
	console.log(absolutePath);
	fs.readdirSync(absolutePath).forEach((file) => {
		const filePath = path.join(absolutePath, file);
		const fileStat = fs.statSync(filePath);
//		console.log(filePath);
		if (fileStat.isFile() && path.extname(file) === ".js") {
			const moduleName = path.basename(file, ".js");
			global_modules[moduleName] = require(filePath);
		}
	});
	// Accessing loaded modules
	for (const moduleName in global_modules) {
		if (global_modules.hasOwnProperty(moduleName)) {
	//		console.log(`Loaded module: ${moduleName}`);
			// Use loadedglobal_modules[moduleName] to access the module's exports
		}
	}
	console.log(global_modules["address.test.data"].reqCreateAddress_1);
}

beforeAll(() => {
	console.log("before all");
	const currentWorkingDirectory = process.cwd();
	console.log(`Current working directory: ${currentWorkingDirectory}`);

	loadModules("./data");
});


var test_uris = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("SETUP API Tests -- POSITIVE TESTS", () => {
	test("Create a new Doer", async () => {
		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Create a new user", async () => {
		const res = await request.post(test_uris.createUserUri).send(global_modules["user.test.data"].reqCreateUser_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
	});

	test("Create a new address for user", async () => {
		const res = await request.post(test_uris.createAddressUri).send(global_modules["address.test.data"].reqCreateAddress_3).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
	});

	test("Create a new Job Request", async () => {
		const res = await request.post(test_uris.createJobUri).send(global_modules["job.test.data"].reqCreateJobRequest_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
	});


	test("Accept a job", async () => {
		const res = await request
			.post(test_uris.acceptJobUri + "?doerId=1&jobId=1")
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
	});

});
