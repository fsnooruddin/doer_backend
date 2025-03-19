module.exports = app => {
        const doers = require("../controllers/doer.controller.js");
        const reservationRequests = require("../controllers/reservationRequest.controller.js");
        const categories = require("../controllers/category.controller.js");
        const addresses = require("../controllers/address.controller.js");
        const users = require("../controllers/user.controller.js");
        const ccards = require("../controllers/ccard.controller.js");
        const bookings = require("../controllers/booking.controller.js");
        const certificates = require("../controllers/certificate.controller.js");
        const payments = require("../controllers/payment.controller.js");
        const invoices = require("../controllers/invoice.controller.js");
        const tasks = require("../controllers/task.controller.js");

        var router = require("express").Router();

        router.get("/getNotes", reservationRequests.getJobNotes);


        // Retrieve all doers
        router.get("/management", doers.findByAvailability);

        router.get("/getAllReservationsRequests", reservationRequests.findAll);

        router.get("/getReservationsRequests", reservationRequests.findByDoerIdandState);

        router.get("/finances", reservationRequests.getReservationFinances);

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
        router.post("/getCategory", categories.findOne);
        router.get("/getAllCategories", categories.findAll);

        router.post("/createAddress", addresses.create);
        router.get("/getAddress", addresses.findOne);
        router.get("/getAllAddresses", addresses.findAll);

        router.post("/createUser", users.create);
        router.get("/getUser", users.findOne);
        router.get("/getAllUsers", users.findAll);

        router.post("/createCCard", ccards.create);
        router.get("/getCCard", ccards.findOne);

        router.post("/createBooking", bookings.create);
        router.get("/getBooking", bookings.findOne);

        router.post("/createCertificate", certificates.create);
        router.post("/getCertificate", certificates.findOne);

        // Create a new Doer
        router.post("/createDoer", doers.create);
        router.get("/getDoer", doers.findOne);
        router.get("/getAllDoers", doers.findAll);

        router.post("/createPayment", payments.create);
        router.get("/getPayment", payments.findOne);

        router.post("/createInvoice", invoices.create);
        router.get("/getInvoice", invoices.findOne);

        router.post("/createTask", tasks.create);
        router.get("/getTask", tasks.findOne);

        app.use('/api/doers', router);
        };