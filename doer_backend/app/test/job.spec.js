const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateJobRequest_1, reqCreateJobRequest_2, reqCreateJobRequest_Malformed } = require("./data/job_request.test.data.js");

async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

async function createJobSuccess() {
	const res = await postData("/createJob", reqCreateJobRequest_1);
	expect(res.status).toBe(200);
	expect(JSON.stringify(res.body)).toContain("job_id");
}

async function createJobFailure() {
	const res = await postData("/createJob", reqCreateJobRequest_Malformed);
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

async function acceptJobSuccess() {
	const res = await postData("/acceptJob?doerId=1&jobId=1", "");
	expect(res.status).toBe(200);
}

async function completeJobSuccess() {
	const res = await postData("/completeJob?doerId=1&jobId=1&duration=120", "");
	expect(res.status).toBe(200);
}

async function acceptJobFailureMissingDoerId() {
	const res = await postData("/acceptJob?jobId=1", "");
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

async function acceptJobFailureMissingJobId() {
	const res = await postData("/acceptJob?doerId=1", "");
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

async function acceptJobFailureJobIdNotInteger() {
	const res = await postData("/acceptJob?doerId=1&jobId=ssjjjss", "");
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

async function acceptJobFailureDoerIdNotInteger() {
	const res = await postData("/acceptJob?doerId=ssjksks&jobId=1", "");
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

async function completeJobFailureMissingJobId() {
	const res = await postData("/completeJob?duration=120", "");
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

async function completeJobFailureMissingDuration() {
	const res = await postData("/completeJob?doerId=1&jobId=1", "");
	expect(res.status).toBe(500);
	expect(JSON.stringify(res.body)).toContain("message");
}

describe("JOB API Tests -- Successful calls", () => {
	test("Successfully create a new Job Request", createJobSuccess);
	test("Successfully accept a Job ", acceptJobSuccess);
	test("Successfully complete Job ", completeJobSuccess);
});

describe("JOB API Tests -- Failure calls", () => {
	test("Fail to create a new Job Request, malformed json body", createJobFailure);
	test("Fail to create a new Job Request, missing json body", createJobFailure);
	test("Fail to complete Job, missing JobId ", completeJobFailureMissingJobId);
	test("Fail to complete Job, missing Duration ", completeJobFailureMissingDuration);
	test("Fail to accept a Job ", acceptJobSuccess);
});
