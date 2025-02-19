const getCategoryByIdRequestUrl = "http://127.0.0.1:8080/api/doer/category/getById";
const getCategoryByNameRequestUrl = "http://127.0.0.1:8080/api/doer/category/getByName";
const getCategoryTreeRequestUrl = "http://127.0.0.1:8080/api/doer/category/getTree";

const getDoerByIdRequestUrl = "http://127.0.0.1:8080/api/doer/getById";
const getDoerByServicesRequestUrl = "http://127.0.0.1:8080/api/doer/getByServices";
const getDoerByServicesAndDayRequestUrl = "http://127.0.0.1:8080/api/doer/getByServicesAndDay";

const createDoerReviewUrl = "http://127.0.0.1:8080/api/doer/review/create";
const getReviewsForDoerRequestUrl = "http://127.0.0.1:8080/api/doer/review/getByDoerId";
const getReviewByIdRequestUrl = "http://127.0.0.1:8080/api/doer/review/getById";

const rateDoerRequestUrl = "http://127.0.0.1:8080/api/doer/rateDoer";

const createDoerTripUrl = "http://127.0.0.1:8080/api/doer//trip/start";
const completeDoerTripUrl = "http://127.0.0.1:8080/api/doer/trip/complete";
const updateDoerTripUrl = "http://127.0.0.1:8080/api/doer/trip/updateLocation";
const getDoerTripByJobIdUrl = "http://127.0.0.1:8080/api/doer/trip/getByJobId";

const updateDoerAvailabilityUrl = "http://127.0.0.1:8080/api/doer/updateDoerAvailability";

const createJobUrl = "http://127.0.0.1:8080/api/doer/job/create";
const acceptJobUrl = "http://127.0.0.1:8080/api/doer/job/accept";
const startJobUrl = "http://127.0.0.1:8080/api/doer/job/start";
const completeJobUrl = "http://127.0.0.1:8080/api/doer/job/complete";
const findEligibleDoersUrl = "http://127.0.0.1:8080/api/doer/job/findEligibleDoers";

const createMessageUrl = "http://127.0.0.1:8080/api/doer/message/create";
const getMessageByIdUrl = "http://127.0.0.1:8080/api/doer/message/getById";
const getMessageByJobIdUrl = "http://127.0.0.1:8080/api/doer/message/getMessagesForJob";

const createUserUrl = "http://127.0.0.1:8080/api/doer/user/create";

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
	getMessageByJobIdUrl,
	createUserUrl
};
