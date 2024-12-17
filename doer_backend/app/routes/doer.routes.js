module.exports = app => {

        const doers = require("../controllers/doer.controller.js");
     
        var router = require("express").Router();


        router.post("/createDoer", doers.create);
        router.get("/getDoerById", doers.findById);
        router.get("/getDoerByServices", doers.findByServices);
        router.get("/getAllDoers", doers.findAll);

        app.use('/api/doer', router);

};