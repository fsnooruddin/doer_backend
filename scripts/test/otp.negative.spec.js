const request = require("supertest")("http://127.0.0.1:8080/api/doer");
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


describe("OTP API Tests -- NEGATIVE TESTS", () => {
	test("Validate a otp -- WRONG number", async () => {
		let validateOTPRequest = reqCreateOTPWrongNumber_1;
		validateOTPRequest.otp = globalOTP;
		console.log(validateOTPRequest);
		const res = await request.post(validateOTPUri).send(reqCreateOTP_1).set("Accept", "application/json");
		console.log(JSON.stringify(res));
		expect(res.status).toBe(500);

		expect(JSON.stringify(res.text)).toContain("message");
	});
});
