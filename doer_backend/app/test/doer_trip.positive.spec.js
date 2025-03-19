var request = require("supertest");
request = request(API_ENDPOINT);

const fs = require("fs");
const path = require("path");
var { expect, jest, test } = require("@jest/globals");

const { createDoerTrip_1, updateDoerTrip_1, updateDoerTrip_2, updateDoerTrip_Malformed } = require("./data/doer_trip.test.data.js");

var {
	getCategoryByIdRequestUri,
	getCategoryByNameRequestUri,
	getCategoryTreeRequestUri,
	getDoerByIdRequestUri,
	getDoerByServicesRequestUri,
	getDoerByServicesAndDayRequestUri,
	getReviewsForDoerRequestUri,
	getReviewByIdRequestUri,
	rateDoerRequestUri,
	getDoerForJobRequestUri,
	getDoerHistoryRequestUri,
	updateDoerAvailabilityUri,
	createDoerReviewUri,
	createDoerTripUri,
	completeDoerTripUri,
	updateDoerTripUri,
	getDoerTripByJobIdUri,
	updateDoerAvailabilityUri,
	createJobUri,
	createDoerReviewUri,
	acceptJobUri,
	startJobUri,
	completeJobUri,
	addCostToJobUri,
	updateDoerAvailabilityUri,
	findEligibleDoersUri,
	createMessageUri,
	getMessageByIdUri,
	getMessageByJobIdUri,
	createDoerUri,
	createOTPUri,
	validateOTPUri,
	createUserUri,
	getUserByIdUri,
	createBadgeUri,
	getBadgeByIdUri,
	assignBadgeUri,
	createAddressUri,
	removeAddressByIdUri,
	updateAddressUri,
	cancelJobUri,
	abandonJobUri,
	generateInvoiceUri,
	approveInvoiceUri,
	rejectInvoiceUri,
	getInvoiceUri,
} = require("./data/test.uris.js");

async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

var global_tripId = null;
var global_jobId = null;
var global_doerId = null;
var global_userId = null;
const global_modules = {};
function loadModules(directoryPath) {
	const absolutePath = path.resolve(directoryPath); // Get absolute path
	console.log(absolutePath);
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

describe("DOER TRIP API Tests -- POSITIVE TESTS", () => {
	test("Create a new user", async () => {
		const res = await request.post(createUserUri).send(global_modules["user.test.data"].reqCreateUser_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
		global_userId = res.body.user_id;
	});

	test("Create a new doer", async () => {
		const res = await request.post(createDoerUri).send(global_modules["doer.test.data"].reqCreateDoer_1).set("Accept", "application/json");
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
		global_doerId = res.body.doer_id;
	});

	test("Create a new job", async () => {
		const res = await request.post(createJobUri).send(global_modules["job.test.data"].reqCreateJobRequest_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
		global_jobId = res.body.job_id;
	});

	it("should create a new doer trip", async () => {
		createDoerTrip_1.doer_id = global_doerId;
		createDoerTrip_1.job_id = global_jobId;
		const res = await request.post(createDoerTripUri).send(createDoerTrip_1).set("Accept", "application/json");
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_trip_id");
		global_tripId = res.body.doer_trip_id;
		console.log(global_tripId);
	});

	it("send location update", async () => {
		console.log(JSON.stringify(updateDoerTrip_1));
		updateDoerTrip_1.id = global_tripId;
		console.log(JSON.stringify(updateDoerTrip_1));
		const res = await request.post(updateDoerTripUri).send(updateDoerTrip_1).set("Accept", "application/json");
		//console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_trip_id");
	});

	it("send location update", async () => {
		console.log(JSON.stringify(updateDoerTrip_2));
		updateDoerTrip_2.id = global_tripId;
		console.log(JSON.stringify(updateDoerTrip_2));
		const res = await request.post(updateDoerTripUri).send(updateDoerTrip_2).set("Accept", "application/json");
		//console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_trip_id");
	});

	it("Get Doer Trip", async () => {
		const res = await request
			.get(getDoerTripByJobIdUri + "?jobId=" + global_jobId)
			.send()
			.set("Accept", "application/json");
		//	console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_trip_id");
	});
});
