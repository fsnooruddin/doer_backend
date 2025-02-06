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
const createDoerTripUrl = "http://127.0.0.1:8080/api/doer/startDoerTrip";
const completeDoerTripUrl = "http://127.0.0.1:8080/api/doer/completeDoerTrip";
const updateDoerTripUrl = "http://127.0.0.1:8080/api/doer/updateDoerTripLocation";
const getDoerTripByJobIdUrl = "http://127.0.0.1:8080/api/doer/getDoerTripByJobId";
const updateDoerAvailabilityUrl = "http://127.0.0.1:8080/api/doer/updateDoerAvailability";

const createJobRequestUrl = "http://127.0.0.1:8080/api/doer/createJob";
const acceptJobUrl = "http://127.0.0.1:8080/api/doer/acceptJob";
const startJobUrl = "http://127.0.0.1:8080/api/doer/startJob";
const completeJobUrl = "http://127.0.0.1:8080/api/doer/completeJob";
const findEligibleDoersUrl = "http://127.0.0.1:8080/api/doer/findEligibleDoers";

const createMessageUrl = "http://127.0.0.1:8080/api/doer/createMessage";
const getMessageByIdUrl = "http://127.0.0.1:8080/api/doer/getMessageById";
const getMessageByJobIdUrl = "http://127.0.0.1:8080/api/doer/getMessageByJobId";

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
	completeDoerTripUrl,
	updateDoerTripUrl,
	getDoerTripByJobIdUrl,
	updateDoerAvailabilityUrl,
	createJobRequestUrl,
	createDoerTripUrl,
	updateDoerTripUrl,
	createDoerReviewUrl,
	acceptJobUrl,
	startJobUrl,
	completeJobUrl,
	updateDoerAvailabilityUrl,
	findEligibleDoersUrl,
	createMessageUrl,
	getMessageByIdUrl,
	getMessageByJobIdUrl
};
