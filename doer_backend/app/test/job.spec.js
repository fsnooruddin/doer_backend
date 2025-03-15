const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

var {
	reqCreateJobRequest_1,
	reqCreateJobRequest_2,
	reqCreateJobCost_1,
	reqCreateJobCost_2,
	reqCreateJobRequest_Malformed,
	reqCreateJobCostTip_1,
} = require("./data/job_request.test.data.js");

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
	createAddressUri,
	removeAddressByIdUri,
	generateInvoiceUri,
} = require("./data/test.uris.js");

async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

async function createJobSuccess() {
	const res = await postData(createJobUri, reqCreateJobRequest_1);
	expect(res.status).toBe(200);
	expect(JSON.stringify(res.body)).toContain("job_id");
}

async function createJobFailure() {
	const res = await postData(createJobUri, reqCreateJobRequest_Malformed);
	expect(res.status).toBe(500);
}

async function acceptJobSuccess() {
	const res = await postData(acceptJobUri + "?doerId=40&jobId=18", "");
	expect(res.status).toBe(200);
}

async function completeJobSuccess() {
	const res = await postData(completeJobUri + "?doerId=1&jobId=1&duration=120", "");
	expect(res.status).toBe(200);
}

async function acceptJobFailureMissingDoerId() {
	const res = await postData(acceptJobUri + "?jobId=1", "");
	expect(res.status).toBe(500);
}

async function acceptJobFailureMissingJobId() {
	const res = await postData(acceptJobUri + "?doerId=1", "");
	expect(res.status).toBe(500);
}

async function acceptJobFailureJobIdNotInteger() {
	const res = await postData(acceptJobUri + "doerId=1&jobId=ssjjjss", "");
	expect(res.status).toBe(500);
}

async function acceptJobFailureDoerIdNotInteger() {
	const res = await postData(acceptJobUri + "?doerId=ssjksks&jobId=1", "");
	expect(res.status).toBe(500);
}

async function completeJobFailureMissingJobId() {
	const res = await postData(completeJobUri + "?duration=120", "");
	expect(res.status).toBe(500);
}

async function completeJobFailureMissingDuration() {
	const res = await postData(completeJobUri + "?doerId=1&jobId=1", "");
	expect(res.status).toBe(500);
}

async function addCostToJobSuccess() {
	const res = await postData(addCostToJobUri, reqCreateJobCost_1);
	expect(res.status).toBe(200);
}

async function addTipToJobSuccess() {
	const res = await postData(addCostToJobUri, reqCreateJobCostTip_1);
	expect(res.status).toBe(200);
}

async function generateInvoiceSuccess() {
	const res = await postData(generateInvoiceUri + "?jobId=1");
	expect(res.status).toBe(200);
}

describe("JOB API Tests -- Successful calls", () => {
	test("Successfully create a new Job Request", createJobSuccess);
	test("Successfully accept a Job ", acceptJobSuccess);
	test("Successfully complete Job ", completeJobSuccess);
	test("Successfully add cost to Job ", addCostToJobSuccess);
	test("Successfully add tip to Job ", addTipToJobSuccess);
	test("Successfully generate invoice for Job ", generateInvoiceSuccess);
});

describe("JOB API Tests -- Failure calls", () => {
	test("Fail to create a new Job Request, malformed json body", createJobFailure);
	test("Fail to create a new Job Request, missing json body", createJobFailure);
	test("Fail to complete Job, missing JobId ", completeJobFailureMissingJobId);
	test("Fail to complete Job, missing Duration ", completeJobFailureMissingDuration);
	test("Fail to accept a Job ", acceptJobSuccess);
});
