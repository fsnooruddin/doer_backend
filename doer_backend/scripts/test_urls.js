const getCategoryByIdRequestUrl = "http://127.0.0.1:8080/api/doer/getCategoryById";
const getCategoryByNameRequestUrl = "http://127.0.0.1:8080/api/doer/getCategoryByName";
const getCategoryTreeRequestUrl = "http://127.0.0.1:8080/api/doer/getCategoryTree";

const getDoerByIdRequestUrl = "http://127.0.0.1:8080/api/doer/getDoerById";
const getDoerByServicesRequestUrl = "http://127.0.0.1:8080/api/doer/getDoerByServices";
const getDoerByServicesAndDayRequestUrl = "http://127.0.0.1:8080/api/doer/getDoerByServicesAndDay";
const getReviewsForDoerRequestUrl = "http://127.0.0.1:8080/api/doer/getReviewsForDoer";
const getReviewByIdRequestUrl = "http://127.0.0.1:8080/api/doer/getReviewById";
const rateDoerRequestUrl = "http://127.0.0.1:8080/api/doer/rateDoer";
const createDoerReviewUrl = "http://127.0.0.1:8080/api/doer/reviewDoer";
const createDoerTripUrl = "http://127.0.0.1:8080/api/doer/createDoerTrip";
const updateDoerTripUrl = "http://127.0.0.1:8080/api/doer/updateDoerTripLocation";
const updateDoerAvailabilityUrl = "http://127.0.0.1:8080/api/doer/updateDoerAvailability";

const createJobRequestUrl = "http://127.0.0.1:8080/api/doer/createJob";
const acceptJobUrl = "http://127.0.0.1:8080/api/doer/acceptJob?doerId=1&jobId=1";
const startJobUrl = "http://127.0.0.1:8080/api/doer/startJob?doerId=1&jobId=1";
const completeJobUrl = "http://127.0.0.1:8080/api/doer/completeJob?doerId=1&jobId=4&duration=22";

module.exports = {
	getCategoryByIdRequestUrl,
	getCategoryByNameRequestUrl,
	getCategoryTreeRequestUrl,
	getDoerByIdRequestUrl,
	getDoerByServicesRequestUrl,
	getDoerByServicesAndDayRequestUrl,
	getReviewsForDoerRequestUrl,
	getReviewByIdRequestUrl,
	rateDoerRequestUrl,
	createDoerReviewUrl,
	createDoerTripUrl,
	updateDoerTripUrl,
	updateDoerAvailabilityUrl,
	createJobRequestUrl,
	createDoerTripUrl,
	updateDoerTripUrl,
	createDoerReviewUrl,
	acceptJobUrl,
	startJobUrl,
	completeJobUrl,
	updateDoerAvailabilityUrl,
};
