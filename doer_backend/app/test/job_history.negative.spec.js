const request = require("supertest")("http://127.0.0.1:8080/api/doer");
var { expect, jest, test } = require("@jest/globals");

const { reqCreateDoer_1, reqCreateDoer_2, reqCreateDoer_3 } = require("./data/doer.test.data.js");
const { reqCreateUser_1 } = require("./data/user.test.data.js");
const { reqCreateMessage_1 } = require("./data/message.test.data.js");
const { reqCreateReview_1, reqCreateReview_Malformed } = require("./data/review.test.data.js");
const { createDoerTrip_1, updateDoerTrip_1, updateDoerTrip_2, updateDoerTrip_Malformed } = require("./data/doer_trip.test.data.js");
const { reqCreateAddress_1, reqCreateAddress_2, reqCreateAddress_3, reqCreateAddress_Malformed } = require("./data/address.test.data.js");

var {
	reqCreateJobRequest_1,
	reqCreateJobRequest_2,
	reqCreateJobCost_1,
	reqCreateJobCost_2,
	reqCreateJobRequest_Malformed,
} = require("./data/job_request.test.data.js");

var {
	reqCreateBadge_1,
	reqCreateBadge_2,
	reqCreateBadgeAssociation_1,
	reqCreateBadgeAssociation_2,
	reqCreateBadge_Malformed,
	reqCreateBadgeAssociation_Malformed,
} = require("./data/badge.test.data.js");

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
	createBadgeUri,
	getBadgeByIdUri,
	assignBadgeUri,
} = require("./data/test.uris.js");

async function getData(url) {
	try {
		const response = await request.get(url).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

describe("JOB HISTORY API Tests -- NEGATIVE TESTS", function () {});


