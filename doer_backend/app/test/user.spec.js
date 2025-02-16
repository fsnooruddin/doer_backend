const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateUser_1, reqCreateUser_Malformed } = require("./data/user.test.data.js");
var {
	getCategoryByIdRequestUri,
	getCategoryByNameRequestUri,
	getCategoryTreeRequestUri,
	getDoerByIdRequestUri,
	getDoerByServicesRequestUri,
	getDoerByServicesAndDayRequestUri,
	getUsersForDoerRequestUri,
	getUserByIdRequestUri,
	rateDoerRequestUri,
	createDoerUserUri,
	createDoerTripUri,
	completeDoerTripUri,
	updateDoerTripUri,
	getDoerTripByJobIdUri,
	updateDoerAvailabilityUri,
	createJobRequestUri,
	createDoerTripUri,
	updateDoerTripUri,
	createDoerUserUri,
	acceptJobUri,
	startJobUri,
	completeJobUri,
	updateDoerAvailabilityUri,
	findEligibleDoersUri,
	getUserByJobIdUri,
	createDoerUri,
	createUserUri,
	getUserByIdUri
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("USER API Tests -- Successful calls", () => {
	test("Create a new user", async () => {
		const res = await request.post(createUserUri).send(reqCreateUser_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("user_id");
	});

	test("Get User by ID", async () => {
    		const res = await request.get(getUserByIdUri + "?id=1");
    		//  console.log(res.body);
    		expect(res.status).toBe(200);
    		expect(JSON.stringify(res.body)).toContain("user_id");
    	});
});

describe("USER API Tests -- UnSuccessful calls", function () {});
