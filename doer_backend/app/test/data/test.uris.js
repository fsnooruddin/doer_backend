const getCategoryByIdRequestUri = "/category/getById";
const getCategoryByNameRequestUri = "/category/getByName";
const getCategoryTreeRequestUri = "/category/getTree";

const createDoerUri = "/doer/create";
const getDoerByIdRequestUri = "/doer/getById";
const getDoerByServicesRequestUri = "/doer/getByServices";
const getDoerByServicesAndDayRequestUri = "/doer/getByServicesAndDay";
const rateDoerRequestUri = "/doer/rate";
const getDoerForJobRequestUri = "/job/findEligibleDoers";
const updateDoerAvailabilityUri = "/doer/updateAvailability";
const getDoerHistoryRequestUri = "/doer/getHistory";

const createDoerReviewUri = "/review/create";
const getReviewsForDoerRequestUri = "/review/getByDoerId";
const getReviewByIdRequestUri = "/review/getById";

const createDoerTripUri = "/trip/create";
const completeDoerTripUri = "/trip/complete";
const updateDoerTripUri = "/trip/updateLocation";
const getDoerTripByJobIdUri = "/trip/getByJobId";

const createJobUri = "/job/create";
const acceptJobUri = "/job/accept";
const startJobUri = "/job/start";
const completeJobUri = "/job/complete";
const findEligibleDoersUri = "/job/findEligibleDoers";
const addCostToJobUri = "/job/addCost";
const cancelJobUri = "/job/cancel";
const abandonJobUri = "/job/abandon";

const createMessageUri = "/message/create";
const getMessageByIdUri = "/message/getById";
const getMessageByJobIdUri = "/message/getByJobId";

const createOTPUri = "/otp/create";
const validateOTPUri = "/otp/validate";

const createUserUri = "/user/create";
const getUserByIdUri = "/user/getById";

const createBadgeUri = "/badge/create";
const getBadgeByIdUri = "/badge/getById";
const assignBadgeUserUri = "/badge/assignBadgeToUser";
const assignBadgeDoerUri = "/badge/assignBadgeToDoer";

const createAddressUri = "/address/create";
const removeAddressByIdUri = "/address/remove";
const updateAddressUri = "/address/update";

const generateInvoiceUri = "/invoice/generate";
const approveInvoiceUri = "/invoice/approve";
const rejectInvoiceUri = "/invoice/reject";
const getInvoiceUri = "/invoice/get";

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
	getDoerForJobRequestUri,
	getDoerHistoryRequestUri,
	updateDoerAvailabilityUri,
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
	assignBadgeUserUri,
	assignBadgeDoerUri,
	createAddressUri,
	removeAddressByIdUri,
	updateAddressUri,
	cancelJobUri,
	abandonJobUri,
	generateInvoiceUri,
	approveInvoiceUri,
	rejectInvoiceUri,
	getInvoiceUri
};
