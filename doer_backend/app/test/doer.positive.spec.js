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

/*
	router.post("/doer/create", doers.create);
	router.get("/doer/getById", doers.findById);
	router.get("/doer/getByServices", doers.findByServices);
	router.get("/doer/getByServicesAndDay", doers.findByServicesAndDay);

	router.get("/doer/getForJob", doers.findForJob);
	router.get("/doer/getHistory", doers.getHistory);
	router.post("/doer/rate", doers.rating);
	router.post("/doer/updateAvailability", doers.updateAvailability);
    router.get("/doer/rating", doers.getRating);
    router.get("/doer/getUpcomingJobs", doers.getUpcomingJobs);
    */

describe("DOER API Tests -- POSITIVE TESTS", () => {
	test("Create a new doer", async () => {
		const res = await request.post(createDoerUri).send(reqCreateDoer_1).set("Accept", "application/json");
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Search Doers by Service", async () => {
		const res = await getData(getDoerByServicesRequestUri + "?services=electric");

		//	console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Search Doers by Day and Service", async () => {
		const res = await request.get(getDoerByServicesAndDayRequestUri + "?day=fri&services=electric");
		//    console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Get Doer by ID", async () => {
		const res = await request.get(getDoerByIdRequestUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Get Doer for Job", async () => {
		const res = await request.get(getDoerForJobRequestUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Get Doer History", async () => {
		const res = await request.get(getDoerHistoryRequestUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Rate Doer", async () => {
		const res = await request.get(rateDoerRequestUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Update Doer Availability", async () => {
		const res = await request.get(updateDoerAvailabilityUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});
});

