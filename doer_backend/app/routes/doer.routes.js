module.exports = (app) => {
	const doers = require("../controllers/doer.controller.js");
	const jobs = require("../controllers/job.controller.js");
	const doer_trips = require("../controllers/doer_trip.controller.js");
	const categories = require("../controllers/category.controller.js");
	const reviews = require("../controllers/review.controller.js");

	var router = require("express").Router();

	router.post("/createDoer", doers.create);
	router.get("/getDoerById", doers.findById);
	router.get("/getDoerByServices", doers.findByServices);
	router.get("/getDoerByServicesAndDay", doers.findByServicesAndDay);
	router.get("/getDoerHistory", doers.getHistory);
	router.post("/rateDoer", doers.rating);
	router.post("/updateDoerAvailability", doers.updateAvailability);

	router.post("/reviewDoer", reviews.create);
	router.get("/getReviewById", reviews.findById);
	router.get("/getReviewsForDoer", reviews.findByDoerId);

	router.post("/createJob", jobs.create);
	router.get("/findEligibleDoers", jobs.findEligibleDoers);
	router.post("/acceptJob", jobs.acceptJob);
	router.post("/startJob", jobs.startJob);
	router.post("/completeJob", jobs.completeJob);
	router.post("/generateInvoice", jobs.generateInvoice);

	router.post("/createDoerTrip", doer_trips.create);
	router.post("/updateDoerTripLocation", doer_trips.updateDoerTripLocation);

	router.post("/createCategory", categories.create);
	router.get("/getCategoryById", categories.findOneById);
	router.get("/getCategoryByName", categories.findOneByName);
	router.get("/getCategoryTree", categories.getCategoryTree);

	app.use("/api/doer", router);
};
