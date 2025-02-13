const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateMessage_1, reqCreateMessage_Malformed } = require("./data/message.test.data.js");
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

describe("MESSAGE API Tests -- Successful calls", () => {
	test("Create a new message", async () => {
		const res = await request.post(createMessageUri).send(reqCreateMessage_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("message_id");
	});

	test("Get Message by ID", async () => {
		const res = await request.get(getMessageByIdUri + "?id=3");
		//  console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("message_id");
	});

		test("Get Message by JOB ID", async () => {
    		const res = await request.get(getMessageByJobIdUri + "?jobId=1");
    		//  console.log(res.body);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("message_id");
    	});
});

describe("MESSAGE API Tests -- UnSuccessful calls", function () {
	test("Get Message by ID, missing ID", async () => {
		const res = await request.get(getMessageByIdUri);

		expect(res.status).toBe(500);

	});

	test("Get Message by ID,Message ID not INTEGER", async () => {
		const res = await request.get(getMessageByIdUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("message");
	});

		test("Get Message by JOB ID, missing JOB ID", async () => {
        		const res = await request.get(getMessageByJobIdUri);
        		//  console.log(res.body);
        		expect(res.status).toBe(500);
        		expect(JSON.stringify(res.body)).toContain("message");
        	});

        		test("Get Message by JOB ID, JOB ID not INTEGER", async () => {
                		const res = await request.get(getMessageByJobIdUri + "?jobId=1ssweeds");
                		//  console.log(res.body);
                		expect(res.status).toBe(500);
                		expect(JSON.stringify(res.body)).toContain("message");
                	});



});
