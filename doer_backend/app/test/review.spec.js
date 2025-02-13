const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateReview_1, reqCreateReview_Malformed } = require("./data/review.test.data.js");
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
    	createDoerTripUri,
    	updateDoerTripUri,
    	createDoerReviewUri,
    	acceptJobUri,
    	startJobUri,
    	completeJobUri,
    	updateDoerAvailabilityUri,
    	findEligibleDoersUri,
    	createMessageUri,
    	getMessageByIdUri,
    	getMessageByJobIdUri,
    	createDoerUri
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("REVIEW API Tests -- Successful calls", () => {
	test("Create a new review", async () => {
		const res = await request.post(createDoerReviewUri).send(reqCreateReview_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});

	test("Get Review by ID", async () => {
		const res = await request.get(getReviewByIdRequestUri + "?id=1");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("review_id");
	});

		test("Get Review by DOER ID", async () => {
    		const res = await request.get(getReviewsForDoerRequestUri + "?doerId=1");
    		//  console.log(res.body);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("review_id");
    	});
});

describe("REVIEW API Tests -- UnSuccessful calls", function () {
	test("Get Review by ID, missing ID", async () => {
		const res = await request.get(getReviewByIdRequestUri);

		expect(res.status).toBe(500);

	});

	test("Get Review by ID,Review ID not INTEGER", async () => {
		const res = await request.get(getReviewByIdRequestUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});

		test("Get Review by DOER ID, missing DOER ID", async () => {
        		const res = await request.get(getReviewsForDoerRequestUri);
        		//  console.log(res.body);
        		expect(res.status).toBe(500);
        		expect(JSON.stringify(res.body)).toContain("message");
        	});

        		test("Get Review by DOER ID, DOER ID not INTEGER", async () => {
                		const res = await request.get(getReviewsForDoerRequestUri + "?doerId=1ssweeds");
                		//  console.log(res.body);
                		expect(res.status).toBe(500);
                		expect(JSON.stringify(res.body)).toContain("message");
                	});

                	test("FAIL to create a new review -- malformed body, not null violation", async () => {
                    		const res = await request.post(createDoerReviewUri).send(reqCreateReview_Malformed).set("Accept", "application/json");
                    		expect(res.status).toBe(500);
                    		expect(JSON.stringify(res.body)).toContain("message");
                    	});

});
