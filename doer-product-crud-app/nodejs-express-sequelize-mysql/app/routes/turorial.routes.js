module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  const reservationRequests = require("../controllers/reservationRequest.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAllByDescription);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a
  router.get("/find", tutorials.findByAvailability);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  router.post("/createScheduleRequests", reservationRequests.createScheduleRequests);

  app.use('/api/tutorials', router);
};
