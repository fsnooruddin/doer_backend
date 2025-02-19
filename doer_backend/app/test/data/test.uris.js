const getCategoryByIdRequestUri = "/category/getById";
const getCategoryByNameRequestUri = "/category/getByName";
const getCategoryTreeRequestUri = "/category/getTree";

const getDoerByIdRequestUri = "/getDoerById";
const getDoerByServicesRequestUri = "/getDoerByServices";
const getDoerByServicesAndDayRequestUri = "/getDoerByServicesAndDay";

const createDoerReviewUri = "/review/create";
const getReviewsForDoerRequestUri = "/review/getByDoerId";
const getReviewByIdRequestUri = "/review/getById";


const rateDoerRequestUri = "/rateDoer";

const createDoerTripUri = "/trip/create";
const completeDoerTripUri = "/completeDoerTrip";
const updateDoerTripUri = "/updateDoerTripLocation";
const getDoerTripByJobIdUri = "/getDoerTripByJobId";
const updateDoerAvailabilityUri = "/updateDoerAvailability";

const createJobRequestUri = "/job/create";
const acceptJobUri = "/job/accept";
const startJobUri = "/job/start";
const completeJobUri = "/job/complete";
const findEligibleDoersUri = "/job/findEligibleDoers";

const createMessageUri = "/message/create";
const getMessageByIdUri = "/message/getById";
const getMessageByJobIdUri = "/message/getMessagesForJob";
const createDoerUri = "/createDoer";

const createOTPUri = "/otp/create";
const validateOTPUri = "/otp/validate";

const createUserUri = "/user/create";
const getUserByIdUri = "/user/findById";

const createBadgeUri = "/badge/create";
const getBadgeByIdUri = "/badge/findById";

const createAddressUri = "/address/create";
const removeAddressByIdUri = "/address/remove";

module.exports = {
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
	createBadgeUri,
    getBadgeByIdUri,
    createAddressUri,
    removeAddressByIdUri
};
