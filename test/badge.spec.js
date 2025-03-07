const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

var {
	reqCreateBadge_1,
	reqCreateBadge_2,
	reqCreateBadgeAssociation_1,
	reqCreateBadgeAssociation_2,
	reqCreateBadge_Malformed,
	reqCreateBadgeAssociation_Malformed,
} = require("./data/badge.test.data.js");

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
	assignBadgeUri,
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
	test("Create a new BADGE", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadge_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});

	test("Create a new BADGE", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadge_2).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});

	test("Get BADGE by ID", async () => {
		const res = await request.get(getBadgeByIdUri + "?id=1");
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("badge_id");
	});

	test("Create a BADGE association", async () => {
		const res = await request.post(assignBadgeUri).send(reqCreateBadgeAssociation_1).set("Accept", "application/json");
		console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("id");
	});
});

describe("BADGE API Tests -- UnSuccessful calls", function () {
	test("Create a new BADGE, malformed body", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadge_Malformed).set("Accept", "application/json");
		expect(res.status).toBe(500);
	});

	test("Create a new BADGE association, malformed body", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadgeAssociation_Malformed).set("Accept", "application/json");
		expect(res.status).toBe(500);
	});

	test("Get Badge by ID, missing ID", async () => {
		const res = await request.get(getBadgeByIdUri);
		expect(res.status).toBe(400);
	});

	test("Get Badge by ID,Badge ID not INTEGER", async () => {
		const res = await request.get(getBadgeByIdUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(500);
	});
});
