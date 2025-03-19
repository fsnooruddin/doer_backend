var request = require("supertest")
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

const { reqCreateAddress_1, reqCreateAddress_Malformed } = require("./data/address.test.data.js");
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

let globalAddressId = "";

describe("ADDRESS API Tests -- POSITIVE TESTS", () => {
	test("Create a new address", async () => {
		const res = await request.post(createAddressUri).send(reqCreateAddress_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("address_id");
		globalAddressId = res.body.address_id;
	});

	test("Update a new address", async () => {
		const res = await request
			.post(updateAddressUri + "?id=" + globalAddressId)
			.send()
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
	});

	test("Remove a new address", async () => {
		const res = await request
			.post(removeAddressByIdUri + "?id=" + globalAddressId)
			.send()
			.set("Accept", "application/json");
		expect(res.status).toBe(200);
	});
});

