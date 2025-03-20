var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

const { createDoerTrip_1, updateDoerTrip_1, updateDoerTrip_Malformed } = require("./data/doer_trip.test.data.js");

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
} = require("./data/test.uris.js");

async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		return response;
	} catch (error) {
		throw error;
	}
}

async function createDoerTripSuccess() {
	const res = await postData(createDoerTripUri, reqCreateDoerTripRequest_1);
	expect(res.status).toBe(200);
	expect(JSON.stringify(res.body)).toContain("doer_trip_id");
}

describe("DOER TRIP API -- NEGATIVE TESTS", function () {
	it("send malformed location update", async () => {
		const res = await request.post(updateDoerTripUri).send(updateDoerTrip_Malformed).set("Accept", "application/json").set("Authorization", USER_AUTH_TOKEN);
		//console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});
});
