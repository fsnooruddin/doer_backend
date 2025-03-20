var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

const fs = require("fs");
const path = require("path");

var global_jobId = null;
var global_userId = null;
var global_doerId = null;
var global_jobId2 = null;
var global_jobId3 = null;
var global_token = null;
const global_modules = {};
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

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		return response;
	} catch (error) {
		throw error;
	}
}

describe("REVIEW API Tests -- POSITIVE TESTS", () => {
	test("Create a new doer", async () => {
		var res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json").set("Authorization", DOER_AUTH_TOKEN);
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
		global_doerId = res.body.doer_id;
		console.log("doer id = " + res.body.doer_id);

		var req_doer = global_modules["auth.test.data"].reqLoginDoer_1;
		req_doer.id = global_doerId;
		console.log(JSON.stringify(req_doer));
		res = await request.post(test_uris.registerUserUri).send(req_doer).set("Accept", "application/json");
		res = await request.post(test_uris.loginUserUri).send(req_doer).set("Accept", "application/json");
		global_token = JSON.parse(res.text).token;
	});

	test("Create a new review", async () => {
		var rev_data = global_modules["review.test.data"].reqCreateReview_1;
		rev_data.doer_id = global_doerId;
		const res = await request.post(test_uris.createDoerReviewUri).send(rev_data).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
		global_reviewId = res.body.review_id;
	});

	test("Get Review by ID", async () => {
		const res = await request.get(test_uris.getReviewByIdRequestUri + "?id=" + global_reviewId).set("Authorization", USER_AUTH_TOKEN);
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});

	test("Get Review by DOER ID", async () => {
		const res = await request.get(test_uris.getReviewsForDoerRequestUri + "?doerId=" + global_doerId).set("Authorization", global_token);
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});
});
