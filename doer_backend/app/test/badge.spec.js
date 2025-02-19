const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateBadge_1, reqCreateBadge_Malformed } = require("./data/badge.test.data.js");
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
	createJobRequestUri,
	createDoerReviewUri,
	acceptJobUri,
	startJobUri,
	completeJobUri,
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
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("BADGE API Tests -- Successful calls", () => {
	test("Create a new badge", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadge_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});

	test("Get Badge by ID", async () => {
		const res = await request.get(getBadgeByIdUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});
});

describe("BADGE API Tests -- UnSuccessful calls", function () {
	/*
	test("Get Badge by ID, missing ID", async () => {
		const res = await request.get(getBadgeByIdUri);

		expect(res.status).toBe(500);
	});

	test("Get Badge by ID,Badge ID not INTEGER", async () => {
		const res = await request.get(getBadgeByIdUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("badge");
	});

	test("Get Badge by JOB ID, missing JOB ID", async () => {
		const res = await request.get(getBadgeByJobIdUri);
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("badge");
	});

	test("Get Badge by JOB ID, JOB ID not INTEGER", async () => {
		const res = await request.get(getBadgeByJobIdUri + "?jobId=1ssweeds");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("badge");
	});
	*/
});
