module.exports = app => {
  const doers = require("../controllers/doer.controller.js");
  const reservationRequests = require("../controllers/reservationRequest.controller.js");
  const categories = require("../controllers/category.controller.js");
  const addresses = require("../controllers/address.controller.js");

  var router = require("express").Router();

  router.get("/getNotes", reservationRequests.getJobNotes);

  // Retrieve all doers
  router.get("/", doers.findAll);

 // Retrieve all doers
  router.get("/management", doers.findByAvailability);

  router.get("/getAllReservationsRequests", reservationRequests.findAll);

  router.get("/getReservationsRequests", reservationRequests.findByDoerIdandState);

  router.get("/finances", reservationRequests.getReservationFinances);

  router.get("/categories", categories.findOne);

  router.get("/getAllCategories", categories.findAll);

  // Retrieve a
  router.get("/find", doers.findByAvailability);

  router.post("/setDoerCurrentLocation", doers.setCurrentLocation);

  // Delete all doers
  router.delete("/", doers.deleteAll);

  router.post("/createScheduleRequests", reservationRequests.createScheduleRequests);

  router.post("/acceptReservationRequests", reservationRequests.acceptReservationRequests);

  router.post("/declineReservationRequests", reservationRequests.declineReservationRequests);

  router.post("/abandonReservationRequests", reservationRequests.abandonReservationRequests);

  router.post("/completeReservationRequests", reservationRequests.completeReservationRequests);

  router.post("/addNotesToJob", reservationRequests.addNotes);

  router.post("/addCategory", categories.create);

  router.post("/addAddress", addresses.create);

  router.get("/getAddress", addresses.findOne);

  router.get("/getAllAddresses", addresses.findAll);

  // Create a new Doer
  router.post("/", doers.create);

    // Retrieve a single Doer with id
    router.get("/:id", doers.findOne);

    // Update a Doer with id
    router.put("/:id", doers.update);

    // Delete a Doer with id
    router.delete("/:id", doers.delete);

  app.use('/api/doers', router);
};
