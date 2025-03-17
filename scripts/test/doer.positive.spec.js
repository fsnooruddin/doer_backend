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


describe("DOER API Tests -- POSITIVE TESTS", () => {
	test("Create a new doer", async () => {
		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json");
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

test("Create a new doer", async () => {
		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_2).set("Accept", "application/json");
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
		global_doerId = res.body.doer_id;
	});

	test("Create a new doer", async () => {
    		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_3).set("Accept", "application/json");
    		//   console.log(res.body);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("doer_id");
    	});

    	test("Create a new user", async () => {
        		const res = await request.post(test_uris.createUserUri).send(global_modules["user.test.data"].reqCreateUser_1).set("Accept", "application/json");
        		expect(res.status).toBe(200);
        		expect(JSON.stringify(res.body)).toContain("user_id");
        		global_userId = res.body.user_id;
        	});

        	test("Create a new Job Request", async () => {
        	    var job_req = global_modules["job.test.data"].reqCreateJobRequest_3;
        		job_req.user_id = global_userId;
        		const res = await request.post(test_uris.createJobUri).send(job_req).set("Accept", "application/json");
        		expect(res.status).toBe(200);
        		expect(JSON.stringify(res.body)).toContain("job_id");
        		global_jobId = res.body.job_id;
        	});

	test("Search Doers by Service", async () => {
		const res = await getData(test_uris.getDoerByServicesRequestUri + "?services=electric");

		console.log("search return is: " + JSON.stringify(res.body));
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Search Doers by Day and Service", async () => {
		const res = await request.get(test_uris.getDoerByServicesAndDayRequestUri + "?day=Sat&services=electric");
		//    console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Get Doer by ID", async () => {
		const res = await request.get(test_uris.getDoerByIdRequestUri + "?id=" + global_doerId);
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

test("Accept a job", async () => {
		const res = await request
			.post(test_uris.acceptJobUri + "?doerId=" + global_doerId + "&jobId=" + global_jobId)
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);

	});

	test("Get Doer for Job", async () => {
		const res = await request.get(test_uris.getDoerForJobRequestUri + "?jobId=" + global_jobId)
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

test("Doer abandon job", async () => {
		const res = await request
			.post(test_uris.abandonJobUri + "?jobId=" + global_jobId + "&doerId=" + global_doerId)
			.send()
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		});

	test("Get Doer History", async () => {
		const res = await request.get(test_uris.getDoerHistoryRequestUri + "?id=" + global_doerId);
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Rate Doer", async () => {
		const res = await request.post(test_uris.rateDoerRequestUri + "?id=" + global_doerId + "&rating=5");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Update Doer Availability", async () => {
		const res = await request.post(test_uris.updateDoerAvailabilityUri + "?id=" + global_doerId).send(global_modules["availability_slots.test.data"].availability_slot_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.text)).toContain("doer_id");
	});

	test("Create a new BADGE", async () => {
		const res = await request.post(test_uris.createBadgeUri).send(global_modules["badge.test.data"].reqCreateBadge_2).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
		global_badgeId = res.body.badge_id;
	});

	test("Create a BADGE association", async () => {
	var badge_req = global_modules["badge.test.data"].reqCreateBadgeAssociation_1;
	badge_req.doer_id = global_doerId;
		badge_req.badge_id = global_badgeId;
		console.log(badge_req);
		const res = await request.post(test_uris.assignBadgeDoerUri).send(  badge_req).set("Accept", "application/json");
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("id");
	});

});

