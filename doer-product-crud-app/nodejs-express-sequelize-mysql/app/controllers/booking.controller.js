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
        booking_date: req.body.booking_date,
        booking_time: req.body.booking_time,
        job_id: req.body.job_id,
        type_of_booking: req.body.type_of_booking,
        invoice_id: req.body.invoice_id,
        status: req.body.status,
        address_id: req.body.address_id,
        req_period: req.body.req_period,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
    };

    console.log("new booking in create booking: ");
    console.log(booking);


    // Save Booking in the database
    Booking.create(booking)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the booking."
            });
        });
};

// Find a single Booking with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    console.log("Booking-controller findOne. id = " + id);

    Booking.findAll({
            where: {
                booking_id: id
            }
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Booking with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving Booking with id=" + id
            });
        });
};

// Find a single Doer with an id
exports.findAll = (req, res) => {

    console.log("Booking-controller findAll..");
    Booking.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Booking in findAll`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving Booking in findAll"
            });
        });
};