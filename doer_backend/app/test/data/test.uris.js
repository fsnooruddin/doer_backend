const getCategoryByIdRequestUri = "/category/getById";
const getCategoryByNameRequestUri = "/category/getByName";
const getCategoryTreeRequestUri = "/category/getTree";

const createDoerUri = "/doer/create";
const getDoerByIdRequestUri = "/doer/getById";
const getDoerByServicesRequestUri = "/doer/getByServices";
const getDoerByServicesAndDayRequestUri = "/doer/getByServicesAndDay";
const rateDoerRequestUri = "/doer/rate";

const createDoerReviewUri = "/review/create";
const getReviewsForDoerRequestUri = "/review/getByDoerId";
const getReviewByIdRequestUri = "/review/getById";




const createDoerTripUri = "/trip/create";
const completeDoerTripUri = "/trip/complete";
const updateDoerTripUri = "/trip/updateLocation";
const getDoerTripByJobIdUri = "/trip/getByJobId";

const updateDoerAvailabilityUri = "/updateDoerAvailability";

const createJobUri = "/job/create";
const acceptJobUri = "/job/accept";
const startJobUri = "/job/start";
const completeJobUri = "/job/complete";
const findEligibleDoersUri = "/job/findEligibleDoers";
const addCostToJobUri = "/job/addCost";

const createMessageUri = "/message/create";
const getMessageByIdUri = "/message/getById";
const getMessageByJobIdUri = "/message/getByJobId";


const createOTPUri = "/otp/create";
const validateOTPUri = "/otp/validate";

const createUserUri = "/user/create";
const getUserByIdUri = "/user/getById";

const createBadgeUri = "/badge/create";
const getBadgeByIdUri = "/badge/getById";
const assignBadgeUri = "/badge/assignBadgeToUser";

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
	createJobUri,
	createDoerReviewUri,
	acceptJobUri,
	startJobUri,
	completeJobUri,
	addCostToJobUri,
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
    assignBadgeUri,
    createAddressUri,
    removeAddressByIdUri
};
