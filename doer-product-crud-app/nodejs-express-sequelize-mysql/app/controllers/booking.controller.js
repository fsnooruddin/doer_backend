const db = require("../models");
const utils = require("../utils/Utils.js");
const Booking = db.bookings;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

  console.log("req body in create booking: ");
  console.log(req.body);


  // Create a Doer
  const booking = {
    user_id: req.body.user_id,
    doer_id: req.body.doer_id,
    booking_type: req.body.booking_type,
    booking_timeslot_id: req.body.booking_timeslot_id,
    job_id: req.body.job_id,
    invoice_id: req.body.invoice_id,
    status: req.body.status,
    address_id: req.body.address_id
  };

  console.log("new booking in create booking: ");
  console.log(booking);


  // Save Doer in the database
  Booking.create(booking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the booking."
      });
    });
};