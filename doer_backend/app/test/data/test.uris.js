const getCategoryByIdRequestUri = "/getCategoryById";
const getCategoryByNameRequestUri = "/getCategoryByName";
const getCategoryTreeRequestUri = "/getCategoryTree";

const getDoerByIdRequestUri = "/getDoerById";
const getDoerByServicesRequestUri = "/getDoerByServices";
const getDoerByServicesAndDayRequestUri = "/getDoerByServicesAndDay";
const getReviewsForDoerRequestUri = "/getReviewsForDoer";
const getReviewByIdRequestUri = "/getReviewById";
const rateDoerRequestUri = "/rateDoer";
const createDoerReviewUri = "/reviewDoer";
const createDoerTripUri = "/trip/create";
const completeDoerTripUri = "/completeDoerTrip";
const updateDoerTripUri = "/updateDoerTripLocation";
const getDoerTripByJobIdUri = "/getDoerTripByJobId";
const updateDoerAvailabilityUri = "/updateDoerAvailability";

const createJobRequestUri = "/createJob";
const acceptJobUri = "/acceptJob";
const startJobUri = "/startJob";
const completeJobUri = "/completeJob";
const findEligibleDoersUri = "/findEligibleDoers";

const createMessageUri = "/createMessage";
const getMessageByIdUri = "/getMessageById";
const getMessageByJobIdUri = "/getMessageByJobId";
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
