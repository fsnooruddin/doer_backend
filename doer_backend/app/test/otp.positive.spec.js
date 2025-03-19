var request = require("supertest");
request = request(API_ENDPOINT);

var { expect, jest, test } = require("@jest/globals");

const { reqCreateOTP_1, reqCreateOTPWrongNumber_1 } = require("./data/otp.test.data.js");
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
	createDoerUri,
	createOTPUri,
	validateOTPUri,
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

let globalOTP = "";

describe("OTP API Tests -- POSITIVE TESTS", () => {
	test("Create a new otp", async () => {
		const res = await request.post(createOTPUri).send(reqCreateOTP_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		//	console.log(JSON.stringify(res.body));
		//	console.log(res.body.otp);
		globalOTP = res.body.otp;
		expect(JSON.stringify(res.body)).toContain("otp_id");
	});

	test("Validate a otp", async () => {
		let validateOTPRequest = reqCreateOTP_1;
		validateOTPRequest.otp = globalOTP;
		console.log(validateOTPRequest);
		const res = await request.post(validateOTPUri).send(reqCreateOTP_1).set("Accept", "application/json");
		expect(res.status).toBe(200);
		//		console.log(JSON.stringify(res));
		expect(JSON.stringify(res.text)).toContain("Matches");
	});
});
