module.exports = app => {

        const doers = require("../controllers/doer.controller.js");
        const job_requests = require("../controllers/job_request.controller.js");
     
        var router = require("express").Router();

        router.post("/createDoer", doers.create);
        router.post("/acceptJob", doers.acceptJob);
        router.post("/completeJob", doers.completeJob);

        router.get("/getDoerById", doers.findById);
        router.get("/getDoerByServices", doers.findByServices);

        router.post("/createJobRequest", job_requests.create);
        router.get("/findEligibleDoers", job_requests.findEligibleDoers);

        app.use('/api/doer', router);

};