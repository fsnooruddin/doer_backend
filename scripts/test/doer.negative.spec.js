const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateDoer_1, reqCreateDoer_2 } = require("./data/doer.test.data.js");
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
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("DOER API Tests -- NEGATIVE TESTS", function () {
	test("Get Doer by ID, missing ID", async () => {
		const res = await request.get(getDoerByIdRequestUri);
		expect(res.status).toBe(500);
	});

	test("Search Doers by Service, missing service", async () => {
		const res = await request.get(getDoerByServicesRequestUri);
		//console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});

	test("Search Doers by Service, service not string", async () => {
		const res = await request.get(getDoerByServicesRequestUri + "?service=827727");
		//console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});

	test("Get Doer by ID, missing Doer ID", async () => {
		const res = await request.get(getDoerByIdRequestUri);
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});

	test("Get Doer by ID, Doer ID not STRING", async () => {
		const res = await request.get(getDoerByIdRequestUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});
});
