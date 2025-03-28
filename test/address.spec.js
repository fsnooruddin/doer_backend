const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateAddress_1, reqCreateAddress_Malformed } = require("./data/address.test.data.js");
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
	createAddressUri,
	removeAddressByIdUri,
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

let globalAddressId = "";

describe("ADDRESS API Tests -- Successful calls", () => {
	test("Create a new address", async () => {
		const res = await request.post(createAddressUri).send(reqCreateAddress_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("address_id");
		globalAddressId = res.body.address_id;
	});

	test("Remove a new address", async () => {
		const res = await request
			.post(removeAddressByIdUri + "?id=" + globalAddressId)
			.send()
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
	});
});

describe("ADDRESS API Tests -- UnSuccessful calls", function () {
	test("Create Address, missing req body", async () => {
		const res = await request.post(createAddressUri);

		expect(res.status).toBe(400);
	});

	/*
	test("Get Address by ID,Address ID not INTEGER", async () => {
		const res = await request.get(getAddressByIdUri + "?id=shshhs");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("address");
	});

	test("Get Address by JOB ID, missing JOB ID", async () => {
		const res = await request.get(getAddressByJobIdUri);
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("address");
	});

	test("Get Address by JOB ID, JOB ID not INTEGER", async () => {
		const res = await request.get(getAddressByJobIdUri + "?jobId=1ssweeds");
		//  console.log(res.body);
		expect(res.status).toBe(500);
		expect(JSON.stringify(res.body)).toContain("address");
	});
	*/
});
