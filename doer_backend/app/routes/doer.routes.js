const Utils = require("../utils/Utils.js");
module.exports = (app) => {

	const doers = require("../controllers/doer.controller.js");
	const jobs = require("../controllers/job.controller.js");
	const doer_trips = require("../controllers/doer_trip.controller.js");
	const categories = require("../controllers/category.controller.js");
	const reviews = require("../controllers/review.controller.js");
	const messages = require("../controllers/message.controller.js");
	const otps = require("../controllers/otp.controller.js");
	const badges = require("../controllers/badge.controller.js");
	const image_uploads = require("../controllers/image_upload.controller.js");
	const users =  require("../controllers/user.controller.js");
    const addresses =  require("../controllers/address.controller.js");
    const invoices =  require("../controllers/invoice.controller.js");
    const certificates =  require("../controllers/certificate.controller.js");

	var router = require("express").Router();

	router.post("/doer/create", doers.create);
	router.get("/doer/getById", doers.findById);
	router.get("/doer/getByServices", doers.findByServices);
	router.get("/doer/getByServicesAndDay", doers.findByServicesAndDay);
	router.get("/doer/getHistory", doers.getHistory);
	router.post("/doer/rate", doers.rating);
	router.post("/doer/updateAvailability", doers.updateAvailability);
    router.get("/doer/rating", doers.getRating);
    router.get("/doer/getUpcomingJobs", doers.getUpcomingJobs);

	router.post("/review/create", reviews.create);
	router.get("/review/getById", reviews.findById);
	router.get("/review/getByDoerId", reviews.findByDoerId);

	router.post("/job/create", jobs.create);
	router.get("/job/findEligibleDoers", jobs.findEligibleDoers);
	router.post("/job/accept", jobs.acceptJob);
	router.post("/job/start", jobs.startJob);
	router.post("/job/complete", jobs.completeJob);
	router.post("/job/addCost", jobs.addJobCost);
	router.post("/job/cancel", jobs.cancelJob);
    router.post("/job/abandon", jobs.abandonJob);

    router.post("/invoice/generate", invoices.generateInvoice);
    router.post("/invoice/approve", invoices.approveInvoice);
    router.post("/invoice/reject", invoices.rejectInvoice);

	router.post("/trip/create", doer_trips.startDoerTrip);
	router.post("/trip/complete", doer_trips.completeDoerTrip);
	router.post("/trip/updateLocation", doer_trips.updateDoerTripLocation);
	router.get("/trip/getByJobId", doer_trips.getDoerTripByJobId);
	router.get("/trip/getByDoerId", doer_trips.getDoerTripByDoerId);

	router.post("/category/create", categories.create);
	router.get("/category/getById", categories.findOneById);
	router.get("/category/getByName", categories.findOneByName);
	router.get("/category/getTree", categories.getCategoryTree);
	router.get("/category/getTopLevelCategories", categories.getTopLevelCategories);

	router.post("/message/create", messages.create);
	router.get("/message/getById", messages.findById);
	router.get("/message/getByJobId", messages.findByJobId);

	router.post("/otp/create", otps.create);
	router.post("/otp/validate", otps.validate);

    router.post("/badge/create", badges.create);
	router.get("/badge/getById", badges.get);
	router.post("/badge/assignBadgeToUser", badges.assignBadgeToUser);
	router.post("/badge/assignBadgeToDoer", badges.assignBadgeToDoer);
    router.post("/badge/removeBadgeFromUser", badges.removeBadgeFromUser);
	router.post("/badge/removeBadgeFromDoer", badges.removeBadgeFromDoer);

	    router.post("/certificate/create", certificates.create);
    	router.get("/certificate/getById", certificates.get);
    	router.post("/certificate/assignCertificateToDoer", certificates.assignCertificateToDoer);
    	router.post("/certificate/removeCertificateFromDoer", certificates.removeCertificateFromDoer);

	router.post("/image/upload", image_uploads.create);

	router.post("/user/create", users.create);
	router.get("/user/getById", users.findById);
	router.get("/user/getAddresses", users.getAddresses);
	router.post("/user/rate", users.rate);
	router.get("/user/rating", users.getRating);
	router.post("/user/register", users.register);
	router.post("/user/login", users.login);

    router.post("/address/create", addresses.create);
	router.post("/address/remove", addresses.remove);
	router.post("/address/update", addresses.update);
//	router.get("/address/getById", addresses.findById);

    router.post("/address/testings", addresses.testings);
    router.post("/address/find_testings", addresses.find_testings);

	app.use("/api/doer", router);
};





