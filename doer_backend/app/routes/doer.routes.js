module.exports = app => {

        const doers = require("../controllers/doer.controller.js");
        const job_requests = require("../controllers/job_request.controller.js");
        const doer_trips = require("../controllers/doer_trip.controller.js");
     
        var router = require("express").Router();

        router.post("/createDoer", doers.create);


        router.get("/getDoerById", doers.findById);
        router.get("/getDoerByServices", doers.findByServices);
        router.get("/getDoerHistory", doers.getHistory);

        router.post("/createJobRequest", job_requests.create);
        router.get("/findEligibleDoers", job_requests.findEligibleDoers);
        router.post("/acceptJob", doers.acceptJob);
        router.post("/completeJob", doers.completeJob);

        router.post("/createDoerTrip", doer_trips.create);
       // router.post("/updateDoerTripLocation", job_requests.create);

        app.use('/api/doer', router);

};