module.exports = (app) => {
	const doers = require("../controllers/doer.controller.js");
	const job_requests = require("../controllers/job_request.controller.js");
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

	router.post("/reviewDoer", reviews.create);

	router.post("/createJobRequest", job_requests.create);
	router.get("/findEligibleDoers", job_requests.findEligibleDoers);
	router.post("/acceptJob", doers.acceptJob);
	router.post("/completeJob", doers.completeJob);

	router.post("/createDoerTrip", doer_trips.create);
	router.post("/updateDoerTripLocation", doer_trips.updateDoerTripLocation);

	router.post("/createCategory", categories.create);
	router.get("/getCategoryById", categories.findOneById);
	router.get("/getCategoryByName", categories.findOneByName);
	router.get("/getCategoryTree", categories.getCategoryTree);

	app.use("/api/doer", router);
};
