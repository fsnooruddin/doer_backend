const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const fs = require("fs");
const path = require("path");



var global_jobId = null;
var global_userId = null;
var global_doerId = null;
var global_jobId2 = null;
var global_jobId3 = null;
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
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}


describe("REVIEW API Tests -- POSITIVE TESTS", () => {

test("Create a new doer", async () => {
		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json");
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
		global_doerId = res.body.doer_id;
	});

	test("Create a new review", async () => {

	    var rev_data = global_modules["review.test.data"].reqCreateReview_1;
	    rev_data.doer_id = global_doerId;
		const res = await request.post(test_uris.createDoerReviewUri).send(rev_data).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
		global_reviewId = res.body.review_id;
	});

	test("Get Review by ID", async () => {
		const res = await request.get(test_uris.getReviewByIdRequestUri + "?id=" + global_reviewId);
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});

	test("Get Review by DOER ID", async () => {
		const res = await request.get(test_uris.getReviewsForDoerRequestUri + "?doerId=" + global_doerId);
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});
});

