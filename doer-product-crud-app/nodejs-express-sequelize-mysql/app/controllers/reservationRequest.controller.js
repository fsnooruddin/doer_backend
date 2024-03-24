const db = require("../models");
const utils = require("../utils/Utils.js");
const ReservationRequest = db.reservationRequests;
const Doer = db.doers;
const JobNotes = db.jobNotes;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
   // Validate request

   console.log("req in create reservation request is");
   console.log(req.body);

   // Create a reservation Request
   const reservationRequest = {
      title: req.body.title,
      description: req.body.description,
      availability: req.body.availability,
      services: req.body.services,
      state: req.body.published
   };

   // Save Doer in the database
   ReservationRequest.create(reservationRequest)
      .then(data => {
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while creating the Doer."
         });
      });
};

exports.createScheduleRequests = (req, res) => {

   console.log(JSON.stringify(req.body.doers_requested));
   const doer = req.body.doerRequested;
   const searchRequest = req.body.searchAvailability;
   const searchServices = req.body.searchServices;

      // Create a reservation
      const reservationRequest = {
         doer_id: doer.doer_id,
         requested_time: searchRequest,
         requested_services: searchServices,
         state: utils.ReservationStates.Requested
      };

      const errFlag = false;
      console.log("about to create new reservation request");
      console.log(reservationRequest);

      // Save it in the database
      ReservationRequest.create(reservationRequest)
         .then(data => {
            console.log("created new reservation request");
            console.log(data);
         })
         .catch(err => {
            console.log("failed to create new reservation request");
            errFlag = true;
            if (err.message) {
               console.log(err.message);
            }
         });

   console.log("Reservation Request object: ");
   console.log(ReservationRequest);
   if (errFlag) {
      res.status(500).send({
         message: "500 from createScheduleRequests"
      });
   } else {
      res.status(200).send();
   }
};

exports.updateCounts = (doerId, state) => {

   switch (state) {
      case utils.ReservationRequests.Accepted:
         Doer.increment('accepted_reservations_count', {
            by: 1,
            where: {
               doer_id: reservations[i].doer_id
            }
         });
         break;
      case utils.ReservationRequests.Declined:
         Doer.increment('declined_reservations_count', {
            by: 1,
            where: {
               doer_id: reservations[i].doer_id
            }
         });
         break;
      case utils.ReservationRequests.Completed:
         Doer.increment('completed_reservations_count', {
            by: 1,
            where: {
               doer_id: reservations[i].doer_id
            }
         });
         break;
      case utils.ReservationRequests.Abandoned:
         Doer.increment('abandoned_reservations_count', {
            by: 1,
            where: {
               doer_id: reservations[i].doer_id
            }
         });
         break;
      default:
         console.log("unknown state in update counts " + state);
         break;
   }

};

exports.addNotes = (req, res) => {

  console.log("body in addNotes is: " + JSON.stringify(req.body));

  const jobNote = {
      doer_id : req.body.doerId,
      reservation_id : req.body.reservationId,
      note_text: req.body.note
  };

  console.log("note data is: " + JSON.stringify(jobNote));

  JobNotes.create(jobNote)
         .then(data => {
              console.log("created new reservation request");
              console.log(data);
              res.status(200).send();
           })
           .catch(err => {
              console.log("failed to create new reservation request");
              errFlag = true;
              if (err.message) {
                 console.log(err.message);
              }
              res.status(500).send();
           });
}


exports.getJobNotes = (req, res) => {

  console.log("body in getJobNotes is: " + JSON.stringify(req.query));


  JobNotes.findAll({

              where: {
                 id: req.query.jobId
              }
  })
         .then(data => {
              console.log("created new reservation request");
              console.log(data);
              res.status(200).send(data);
           })
           .catch(err => {
              console.log("failed to create new reservation request");
              errFlag = true;
              if (err.message) {
                 console.log(err.message);
              }
              res.status(500).send();
           });
}

exports.acceptReservationRequests = (req, res) => {

   console.log("body in accept Reservation Requests is: " + req.body.reservations[0]);
    console.log("body in accept Reservation Requests is: " + req.body.doerId);
   const reservations = req.body.reservations;

   let errFlag = false;
   for (let i = 0; i < reservations.length; i++) {

      // Save Doer in the database
      ReservationRequest.update({
            state: utils.ReservationStates.Accepted
         }, {
            where: {
               id: reservations[i].id
            }
         })
         .then(data => {
            console.log("accepted reservation request");
            console.log(data);
        console.log(reservations[i]);
            console.log("Doer id = " + reservations[i].doerId);
            Doer.increment('accepted_reservations_count', {
               by: 1,
               where: {
                  doer_id: reservations[i].doer_id
               }
            });
         })
         .catch(err => {
            console.log("failed to update reservation request");
            errFlag = true;
            if (err.message) {
               console.log(err.message);
            }
         });


   }

   if (errFlag) {
      res.status(500).send({
         message: "500 from updateScheduleRequests"
      });
   } else {
      res.status(200).send();
   }

};

exports.declineReservationRequests = (req, res) => {

   console.log("in decline reservation requests" + req.body.reservations);
   const reservations = req.body.reservations;

   let errFlag = false;
   for (let i = 0; i < reservations.length; i++) {
      ReservationRequest.update({
            state: utils.ReservationStates.Declined
         }, {
            where: {
               id: reservations[i].id
            }
         })
         .then(data => {
            console.log("updatedreservation request");
            console.log(data);
            Doer.increment('declined_reservations_count', {
               by: 1,
               where: {
                  doer_id: reservations[i].doer_id
               }
            });
         })
         .catch(err => {
            console.log("failed to update reservation request");
            errFlag = true;
            if (err.message) {
               console.log(err.message);
            }
         });
   }

   if (errFlag) {
      res.status(500).send({
         message: "500 from updateScheduleRequests"
      });
   } else {
      res.status(200).send();
   }

};

exports.abandonReservationRequests = (req, res) => {

   console.log("in console.log(req.body.reservations);");
   console.log(req.body.reservations);
   const reservations = req.body.reservations;

   let errFlag = false;
   for (let i = 0; i < reservations.length; i++) {
      ReservationRequest.update({
            state: utils.ReservationStates.Abandoned
         }, {
            where: {
               id: reservations[i].id
            }
         })
         .then(data => {
            console.log("abandonReservationRequests request done");
            console.log(data);
            Doer.increment('abandoned_reservations_count', {
               by: 1,
               where: {
                   doer_id: reservations[i].doer_id
               }
            });
         })
         .catch(err => {
            console.log("failed to abandonReservationRequests request");
            errFlag = true;
            if (err.message) {
               console.log(err.message);
            }
         });
   }

   if (errFlag) {
      res.status(500).send({
         message: "500 from updateScheduleRequests"
      });
   } else {
      res.status(200).send();
   }

};

exports.completeReservationRequests = (req, res) => {

   console.log("completeReservationRequests request");
   console.log(req.body.reservations);
   const reservations = req.body.reservations;


   let errFlag = false;
   for (let i = 0; i < reservations.length; i++) {
      ReservationRequest.update({
            state: reservations[i].state
         }, {
            where: {
               id: reservations[i].id
            }
         })
         .then(data => {
            console.log("updated completeReservationRequests request");
            console.log(data);
            console.log("updating completed job counts");
            Doer.increment('completed_reservations_count', {
               by: 1,
               where: {
                    doer_id: reservations[i].doer_id
               }
            });
         })
         .catch(err => {
            console.log("failed to completeReservationRequests request");
            errFlag = true;
            if (err.message) {
               console.log(err.message);
            }
         });
   }

   if (errFlag) {
      res.status(500).send({
         message: "500 from completeReservationRequests"
      });
   } else {
      res.status(200).send();
   }

};

exports.getReservationFinances = (req, res) => {

};

// Retrieve all Doers from the database
// or only those whose title  matches
exports.findAll = (req, res) => {
   console.log("in reservation request findAll");
   var condition = null;

   ReservationRequest.findAll({
         attributes: {
            include: [
               [
                  // Note the wrapping parentheses in the call below!
                  db.sequelize.literal(`(
                       SELECT name FROM doers WHERE doers.doer_id = ReservationRequest.doer_id
                    )`),
                  'doer_name'
               ]
            ]
         }
      })
      .then(data => {
         console.log("return data from get all reservation requests");
         console.log(data);
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving doers."
         });
      });
};

// Retrieve all Doers from the database
// or only those whose title  matches
exports.findByDoerIdandState = (req, res) => {

   console.log("in reservation request findByDoerIdandState");
   console.log(req.query);

   var condition = null;
   var doerId = req.query.doerId;
   var state = req.query.state;

   ReservationRequest.findAll({
         attributes: {
            include: [
               [
                  // Note the wrapping parentheses in the call below!
                  db.sequelize.literal(`(
                       SELECT name FROM doers WHERE doers.doer_id = ReservationRequest.doer_id
                    )`),
                  'doer_name'
               ]
            ]
         },
         where: {
            doer_id: doerId,
            state: state
         }
      })
      .then(data => {
         //    console.log("return data from get all reservation requests");
         //   console.log(data);
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
         });
      });
};

// Find a single Doer with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   console.log("in reservation request findOne");
   Doer.findByPk(id)
      .then(data => {
         if (data) {
            res.send(data);
         } else {
            res.status(404).send({
               message: `Cannot find Doer with id=${id}.`
            });
         }
      })
      .catch(err => {
         res.status(500).send({
            message: "Error retrieving Doer with id=" + id
         });
      });
};

// Delete a Doer with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;

   Doer.destroy({
         where: {
            id: id
         }
      })
      .then(num => {
         if (num == 1) {
            res.send({
               message: "Doer was deleted successfully!"
            });
         } else {
            res.send({
               message: `Cannot delete Doer with id=${id}. Maybe Doer was not found!`
            });
         }
      })
      .catch(err => {
         res.status(500).send({
            message: "Could not delete Doer with id=" + id
         });
      });
};

// Delete all Doers from the database.
exports.deleteAll = (req, res) => {
   Doer.destroy({
         where: {},
         truncate: false
      })
      .then(nums => {
         res.send({
            message: `${nums} Doers were deleted successfully!`
         });
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorials."
         });
      });
};