var request = require("supertest");
request = request(API_ENDPOINT);
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
		const response = await request.get(url).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		return response;
	} catch (error) {
		throw error;
	}
}

describe("BADGE API Tests -- NEGATIVE TESTS", function () {
	test("Create a new BADGE, malformed body", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadge_Malformed).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(500);
	});

	test("Create a new BADGE association, malformed body", async () => {
		const res = await request.post(createBadgeUri).send(reqCreateBadgeAssociation_Malformed).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(500);
	});

	test("Get Badge by ID, missing ID", async () => {
		const res = await request.get(getBadgeByIdUri).set("Authorization", USER_AUTH_TOKEN);
		expect(res.status).toBe(400);
	});

	test("Get Badge by ID,Badge ID not INTEGER", async () => {
		const res = await request.get(getBadgeByIdUri + "?id=shshhs").set("Authorization", USER_AUTH_TOKEN);
		//  console.log(res.body);
		expect(res.status).toBe(500);
	});
});
