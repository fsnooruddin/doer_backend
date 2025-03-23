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
	const users = require("../controllers/user.controller.js");
	const addresses = require("../controllers/address.controller.js");
	const invoices = require("../controllers/invoice.controller.js");
	const auth = require("../controllers/authentication.controller.js");

	var router = require("express").Router();

	router.post("/doer/create", Utils.VerifyAuth, (req, res) => {
		doers.create(req, res);
	});

	router.get("/doer/getById", Utils.VerifyAuth, (req, res) => {
		doers.findById(req, res);
	});

	router.get("/doer/getByServices", Utils.VerifyAuth, (req, res) => {
		doers.findByServices(req, res);
	});

	router.get("/doer/getByServicesAndDay", Utils.VerifyAuth, (req, res) => {
		doers.findByServicesAndDay(req, res);
	});

	router.get("/doer/getHistory", Utils.VerifyAuth, (req, res) => {
		doers.getHistory(req, res);
	});

	router.post("/doer/rate", Utils.VerifyAuth, (req, res) => {
		doers.rating(req, res);
	});

	router.post("/doer/updateAvailability", Utils.VerifyAuth, (req, res) => {
		doers.updateAvailability(req, res);
	});

	router.get("/doer/rating", Utils.VerifyAuth, (req, res) => {
		doers.getRating(req, res);
	});

	router.get("/doer/getUpcomingJobs", Utils.VerifyAuth, (req, res) => {
		doers.getUpcomingJobs(req, res);
	});

	router.post("/review/create", Utils.VerifyAuth, (req, res) => {
		reviews.create(req, res);
	});

	router.get("/review/getById", Utils.VerifyAuth, (req, res) => {
		reviews.findById(req, res);
	});

	router.get("/review/getByDoerId", Utils.VerifyAuth, (req, res) => {
		reviews.findByDoerId(req, res);
	});

	router.post("/job/create", Utils.VerifyAuth, (req, res) => {
		jobs.create(req, res);
	});

	router.get("/job/findEligibleDoers", Utils.VerifyAuth, (req, res) => {
		jobs.findEligibleDoers(req, res);
	});

	router.post("/job/accept", Utils.VerifyAuth, (req, res) => {
		jobs.acceptJob(req, res);
	});

	router.post("/job/start", Utils.VerifyAuth, (req, res) => {
		jobs.startJob(req, res);
	});

	router.post("/job/complete", Utils.VerifyAuth, (req, res) => {
		jobs.completeJob(req, res);
	});

	router.post("/job/addCost", Utils.VerifyAuth, (req, res) => {
		jobs.addJobCost(req, res);
	});

	router.post("/job/cancel", Utils.VerifyAuth, (req, res) => {
		jobs.cancelJob(req, res);
	});

	router.post("/job/abandon", Utils.VerifyAuth, (req, res) => {
		jobs.abandonJob(req, res);
	});

	router.post("/invoice/generate", Utils.VerifyAuth, (req, res) => {
		invoices.generateInvoice(req, res);
	});

	router.post("/invoice/approve", Utils.VerifyAuth, (req, res) => {
		invoices.approveInvoice(req, res);
	});

	router.post("/invoice/reject", Utils.VerifyAuth, (req, res) => {
		invoices.rejectInvoice(req, res);
	});

	router.post("/trip/create", Utils.VerifyAuth, (req, res) => {
		doer_trips.startDoerTrip(req, res);
	});

	router.post("/trip/complete", Utils.VerifyAuth, (req, res) => {
		doer_trips.completeDoerTrip(req, res);
	});

	router.post("/trip/updateLocation", Utils.VerifyAuth, (req, res) => {
		doer_trips.updateDoerTripLocation(req, res);
	});

	router.get("/trip/getByJobId", Utils.VerifyAuth, (req, res) => {
		doer_trips.getDoerTripByJobId(req, res);
	});

	router.get("/trip/getByDoerId", Utils.VerifyAuth, (req, res) => {
		doer_trips.getDoerTripByDoerId(req, res);
	});

	router.post("/category/create", Utils.VerifyAuth, (req, res) => {
		categories.create(req, res);
	});

	router.get("/category/getById", Utils.VerifyAuth, (req, res) => {
		categories.findOneById(req, res);
	});

	router.get("/category/getByName", Utils.VerifyAuth, (req, res) => {
		categories.findOneByName(req, res);
	});

	router.get("/category/getTree", Utils.VerifyAuth, (req, res) => {
		categories.getCategoryTree(req, res);
	});

	router.get("/category/getTopLevelCategories", Utils.VerifyAuth, (req, res) => {
		categories.getTopLevelCategories(req, res);
	});

	router.post("/message/create", Utils.VerifyAuth, (req, res) => {
		messages.create(req, res);
	});

	router.get("/message/getById", Utils.VerifyAuth, (req, res) => {
		messages.findById(req, res);
	});

	router.get("/message/getByJobId", Utils.VerifyAuth, (req, res) => {
		messages.findByJobId(req, res);
	});

	router.post("/otp/create", Utils.VerifyAuth, (req, res) => {
		otps.create(req, res);
	});

	router.post("/otp/validate", Utils.VerifyAuth, (req, res) => {
		otps.validate(req, res);
	});

	router.post("/badge/create", Utils.VerifyAuth, (req, res) => {
		badges.create(req, res);
	});

	router.get("/badge/getById", Utils.VerifyAuth, (req, res) => {
		badges.get(req, res);
	});

	router.post("/badge/assignBadgeToUser", Utils.VerifyAuth, (req, res) => {
		badges.assignBadgeToUser(req, res);
	});

	router.post("/badge/assignBadgeToDoer", Utils.VerifyAuth, (req, res) => {
		badges.assignBadgeToDoer(req, res);
	});

	router.post("/badge/removeBadgeFromUser", Utils.VerifyAuth, (req, res) => {
		badges.removeBadgeFromUser(req, res);
	});

	router.post("/badge/removeBadgeFromDoer", Utils.VerifyAuth, (req, res) => {
		badges.removeBadgeFromDoer(req, res);
	});


	router.post("/image/upload", Utils.VerifyAuth, (req, res) => {
		image_uploads.create(req, res);
	});

	router.post("/user/create", Utils.VerifyAuth, (req, res) => {
		users.create(req, res);
	});

	router.get("/user/getById", Utils.VerifyAuth, (req, res) => {
		users.findById(req, res);
	});

	router.get("/user/getAddresses", Utils.VerifyAuth, (req, res) => {
		users.getAddresses(req, res);
	});

	router.post("/user/rate", Utils.VerifyAuth, (req, res) => {
		users.rate(req, res);
	});

	router.get("/user/rating", Utils.VerifyAuth, (req, res) => {
		users.getRating(req, res);
	});

	router.post("/auth/register", auth.register);

	router.post("/auth/login", auth.login);

	router.post("/address/create", Utils.VerifyAuth, (req, res) => {
		addresses.create(req, res);
	});

	router.post("/address/remove", Utils.VerifyAuth, (req, res) => {
		addresses.remove(req, res);
	});

	router.post("/address/update", Utils.VerifyAuth, (req, res) => {
		addresses.update(req, res);
	});

	router.get("/address/getById", Utils.VerifyAuth, (req, res) => {
		addresses.findById(req, res);
	});

	router.post("/address/testings", Utils.VerifyAuth, (req, res) => {
		addresses.testings(req, res);
	});

	router.post("/address/find_testings", Utils.VerifyAuth, (req, res) => {
		addresses.find_testings(req, res);
	});

	app.use("/api/doer", router);
};
