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

	var router = require("express").Router();

	router.post("/createDoer", doers.create);
	router.get("/getDoerById", doers.findById);
	router.get("/getDoerByServices", doers.findByServices);
	router.get("/getDoerByServicesAndDay", doers.findByServicesAndDay);
	router.get("/getDoerHistory", doers.getHistory);
	router.post("/rateDoer", doers.rating);
	router.post("/updateDoerAvailability", doers.updateAvailability);
    router.get("/doer/getDoerById", doers.findById);

	router.post("/review/create", reviews.create);
	router.get("/review/getById", reviews.findById);
	router.get("/review/getByDoerId", reviews.findByDoerId);

	router.post("/job/create", jobs.create);
	router.get("/job/findEligibleDoers", jobs.findEligibleDoers);
	router.post("/job/accept", jobs.acceptJob);
	router.post("/job/start", jobs.startJob);
	router.post("/job/complete", jobs.completeJob);
	router.post("/job/generateInvoice", jobs.generateInvoice);


	router.post("/trip/create", doer_trips.startDoerTrip);
	router.post("/completeDoerTrip", doer_trips.completeDoerTrip);
	router.post("/updateDoerTripLocation", doer_trips.updateDoerTripLocation);
	router.get("/getDoerTripByJobId", doer_trips.getDoerTripByJobId);

	router.post("/category/create", categories.create);
	router.get("/category/getById", categories.findOneById);
	router.get("/category/getByName", categories.findOneByName);
	router.get("/category/getTree", categories.getCategoryTree);

	router.post("/message/create", messages.create);
	router.get("/message/getById", messages.findById);
	router.get("/message/getMessagesForJob", messages.findByJobId);

	router.post("/otp/create", otps.create);
	router.post("/otp/validate", otps.validate);

    router.post("/badge/create", badges.create);
	router.get("/badge/findById", badges.get);

	router.post("/image/upload", image_uploads.create);

	router.post("/user/create", users.create);
	router.get("/user/findById", users.findById);

    router.post("/address/create", addresses.create);
	router.post("/address/remove", addresses.remove);

	app.use("/api/doer", router);
};
