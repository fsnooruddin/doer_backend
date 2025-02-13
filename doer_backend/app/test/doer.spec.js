const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateDoer_1, reqCreateDoer_2 } = require("./data/doer.test.data.js");
var {
	getDoerByIdRequestUri,
	getDoerByServicesRequestUri,
	getDoerByServicesAndDayRequestUri,
	getReviewsForDoerRequestUri,
	getReviewByIdRequestUri,
	rateDoerRequestUri,
	createDoerReviewUri,
	createDoerTripUri,
	updateDoerTripUri,
	completeDoerTripUri,
	updateDoerAvailabilityUri,
	createDoerUri,
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("DOER API Tests -- Successful calls", () => {
	test("Create a new doer", async () => {
		const res = await request.post(createDoerUri).send(reqCreateDoer_1).set("Accept", "application/json");
		//   console.log(res.body);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("doer_id");
	});

	test("Search Doers by Service", async () => {
		//	const res = await getData(getDoerByServicesRequestUrl + "?services=electric");
		const res = await getData("/getDoerByServices" + "?services=electric");
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
});

describe("DOER API Tests -- UnSuccessful calls", function () {
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
