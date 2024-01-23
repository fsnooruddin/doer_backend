module.exports = app => {
  const doers = require("../controllers/doer.controller.js");
  const reservationRequests = require("../controllers/reservationRequest.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", doers.create);

  // Retrieve all doers
  router.get("/", doers.findAll);

 // Retrieve all doers
  router.get("/management", doers.findByAvailability);

  router.get("/getAllReservationsRequests", reservationRequests.findAll);

  router.get("/getReservationsRequests", reservationRequests.findByDoerIdandState);

  router.get("/getReservationRequestCounts", reservationRequests.getReservationRequestCounts)

  // Retrieve a
  router.get("/find", doers.findByAvailability);

  // Retrieve a single Doer with id
  router.get("/:id", doers.findOne);

  // Update a Doer with id
  router.put("/:id", doers.update);

  // Delete a Doer with id
  router.delete("/:id", doers.delete);

  // Delete all doers
  router.delete("/", doers.deleteAll);

  router.post("/createScheduleRequests", reservationRequests.createScheduleRequests);

  router.post("/acceptReservationRequests", reservationRequests.acceptReservationRequests);

  router.post("/declineReservationRequests", reservationRequests.declineReservationRequests);

  router.post("/abandonReservationRequests", reservationRequests.abandonReservationRequests);

  router.post("/completeReservationRequests", reservationRequests.completeReservationRequests);

  app.use('/api/doers', router);
};
