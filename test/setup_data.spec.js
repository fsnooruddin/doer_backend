const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateDoer_1, reqCreateDoer_2, reqCreateDoer_3 } = require("./data/doer.test.data.js");
const { reqCreateUser_1 } = require("./data/user.test.data.js");
const { reqCreateMessage_1 } = require("./data/message.test.data.js");
const { reqCreateReview_1, reqCreateReview_Malformed } = require("./data/review.test.data.js");
const { createDoerTrip_1, updateDoerTrip_1, updateDoerTrip_Malformed } = require("./data/doer_trip.test.data.js");
const { reqCreateAddress_1, reqCreateAddress_2, reqCreateAddress_3, reqCreateAddress_Malformed } = require("./data/address.test.data.js");

var {
	reqCreateJobRequest_1,
	reqCreateJobRequest_2,
	reqCreateJobCost_1,
	reqCreateJobCost_2,
	reqCreateJobRequest_Malformed,
} = require("./data/job_request.test.data.js");

var {
	getCategoryByIdRequestUri,
	getCategoryByNameRequestUri,
	getCategoryTreeRequestUri,
	getDoerByIdRequestUri,
	getDoerByServicesRequestUri,
	getDoerByServicesAndDayRequestUri,
	getMessagesForDoerRequestUri,
	getMessageByIdRequestUri,
	rateDoerRequestUri,
	createDoerMessageUri,
	createDoerTripUri,
	completeDoerTripUri,
	updateDoerTripUri,
	getDoerTripByJobIdUri,
	updateDoerAvailabilityUri,
	createJobRequestUri,
	createDoerTripUri,
	updateDoerTripUri,
	createDoerMessageUri,
	createUserUri,
	createJobUri,
	acceptJobUri,
	startJobUri,
	completeJobUri,
	updateDoerAvailabilityUri,
	findEligibleDoersUri,
	createMessageUri,
	getMessageByIdUri,
	getMessageByJobIdUri,
	createDoerUri,
	createDoerReviewUri,
	createAddressUri,
	removeAddressByIdUri,
	updateAddressUri,
	cancelJobUri,
    abandonJobUri
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("SETUP API Tests -- Successful calls", () => {

  
	test("Create a new Doer", async () => {
		const res = await request.post(createDoerUri).send(reqCreateDoer_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Create a new user", async () => {
		const res = await request.post(createUserUri).send(reqCreateUser_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
	});

    test("Create a new address for user", async () => {
    		const res = await request.post(createAddressUri).send(reqCreateAddress_3).set("Accept", "application/json");
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("user_id");
    	});

    	test("Update address for user", async () => {
    		const res = await request.post(updateAddressUri + "?id=a63cc75a-ed7e-4787-a2b6-f6aba66593b0").send(reqCreateAddress_2).set("Accept", "application/json");
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("user_id");
    	});

	test("Create a new Doer", async () => {
		const res = await request.post(createDoerUri).send(reqCreateDoer_2).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Create a new Job Request", async () => {
		const res = await request.post(createJobUri).send(reqCreateJobRequest_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
	});

	test("Create a new Job Request", async () => {
		const res = await request.post(createJobUri).send(reqCreateJobRequest_2).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("job_id");
	});

	test("Create a new Message", async () => {
		const res = await request.post(createMessageUri).send(reqCreateMessage_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("message_id");
	});

	test("Create a new Review", async () => {
		const res = await request.post(createDoerReviewUri).send(reqCreateReview_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});

	test("Rate a Doer", async () => {
		const res = await request
			.post(rateDoerRequestUri + "?id=1&rating=433")
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("rating_id");
	});

	test("Accept a job", async () => {
		const res = await request
			.post(acceptJobUri + "?doerId=1&jobId=1")
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
	});

	test("Start Doer Trip", async () => {
		const res = await request
			.post(acceptJobUri + "?doerId=1&jobId=1")
			.send("")
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
	});

	test("should create a new doer trip", async () => {
		const res = await request.post(createDoerTripUri).send(createDoerTrip_1).set("Accept", "application/json");
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_trip_id");
	});

	test("send location update", async () => {
		const res = await request.post(updateDoerTripUri).send(updateDoerTrip_1).set("Accept", "application/json");
		//console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_trip_id");
	});

	      test("User cancel job", async () => {
        		const res = await request.post(cancelJobUri + "?jobId=1&userId=1").send().set("Accept", "application/json");
        		expect(res.status).toBe(200);
        		expect(JSON.stringify(res.body)).toContain("user_id");
        	});

            test("Doer abandon job", async () => {
        		const res = await request.post(abandonJobUri + "?jobId=1&doerId=1").send().set("Accept", "application/json");
        		expect(res.status).toBe(200);
        		expect(JSON.stringify(res.body)).toContain("user_id");
        	});
});
