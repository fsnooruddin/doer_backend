const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
var {
	reqCreateJobRequest_1,
	reqCreateJobRequest_2,
	reqCreateJobCost_1,
	reqCreateJobCost_2,
	reqCreateJobRequest_Malformed,
	reqCreateJobCostTip_1,
} = require("./data/job.test.data.js");

var test_uris = require("./data/test.uris.js");

async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

var global_jobId = null;
var global_userId = null;
var global_doerId = null;
var global_jobId2 = null;
var global_jobId3 = null;
const global_modules = {};
function loadModules(directoryPath) {
	const absolutePath = path.resolve(directoryPath); // Get absolute path
	console.log(absolutePath);
	fs.readdirSync(absolutePath).forEach((file) => {
		const filePath = path.join(absolutePath, file);
		const fileStat = fs.statSync(filePath);
		console.log(filePath);
		if (fileStat.isFile() && path.extname(file) === ".js") {
			const moduleName = path.basename(file, ".js");
			global_modules[moduleName] = require(filePath);
		}
	});
	// Accessing loaded modules
	for (const moduleName in global_modules) {
		if (global_modules.hasOwnProperty(moduleName)) {
			console.log(`Loaded module: ${moduleName}`);
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

describe("JOB API Tests -- SUCCESS", () => {
	test("Create a new Doer", async () => {
		const res = await request.post(test_uris.createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
		global_doerId = res.body.doer_id;
	});

	test("Create a new user", async () => {
		const res = await request.post(test_uris.createUserUri).send(global_modules["user.test.data"].reqCreateUser_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
		global_userId = res.body.user_id;
	});

	test("Create a new Job Request", async () => {
		reqCreateJobRequest_1.user_id = global_userId;
		const res = await request.post(test_uris.createJobUri).send(reqCreateJobRequest_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
		global_jobId = res.body.job_id;
	});

	test("Create a new Job Request", async () => {
		reqCreateJobRequest_1.user_id = global_userId;
		const res = await request.post(test_uris.createJobUri).send(reqCreateJobRequest_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
		global_jobId2 = res.body.job_id;
	});

	test("Create a new Job Request", async () => {
		reqCreateJobRequest_1.user_id = global_userId;
		const res = await request.post(test_uris.createJobUri).send(reqCreateJobRequest_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
		global_jobId3 = res.body.job_id;
	});

	test("Accept a job", async () => {
		const res = await request
			.post(test_uris.acceptJobUri + "?doerId=" + global_doerId + "&jobId=" + global_jobId)
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		global_job_Id = res.body.job_id;
	});

	test("Accept a job", async () => {
		const res = await request
			.post(test_uris.acceptJobUri + "?doerId=" + global_doerId + "&jobId=" + global_jobId2)
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		global_job_Id = res.body.job_id;
	});

	test("Accept a job", async () => {
		const res = await request
			.post(test_uris.acceptJobUri + "?doerId=" + global_doerId + "&jobId=" + global_jobId3)
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		global_job_Id = res.body.job_id;
	});

	test("User cancel job", async () => {
		const res = await request
			.post(test_uris.cancelJobUri + "?jobId=" + global_jobId2 + "&userId=" + global_userId)
			.send()
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		console.log(res);
		//	expect(JSON.stringify(res.body)).toContain("success");
	});

	test("Doer abandon job", async () => {
		const res = await request
			.post(test_uris.abandonJobUri + "?jobId=" + global_jobId + "&doerId=" + global_doerId)
			.send()
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		//expect(JSON.stringify(res.body)).toContain("success");
	});
});
