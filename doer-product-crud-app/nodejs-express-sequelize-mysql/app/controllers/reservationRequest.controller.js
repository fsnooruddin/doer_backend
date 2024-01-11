const db = require("../models");
const ReservationRequest = db.reservationRequests;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a reservation Request
  const reservationRequest = {
    title: req.body.title,
    description: req.body.description,
    availability: req.body.availability,
    services: req.body.services,
    state: req.body.published
  };

  // Save Tutorial in the database
  ReservationRequest.create(reservationRequest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.createScheduleRequests = (req, res) => {

    const tutorials = req.body.doers_requested;
    const searchRequest = req.body.searchAvailability;
    const searchServices = req.body.searchServices;

    let errFlag = false;
    for(let i=0;i<tutorials.length;i++) {

         // Create a Tutorial
          const reservationRequest = {
            tutorialId: tutorials[i].id,
            requested_time: searchRequest,
            requested_services: searchServices,
            state: 1
          };

          console.log(reservationRequest);

                   // Save Tutorial in the database
                    ReservationRequest.create(reservationRequest)
                      .then(data => {
                       console.log("created new reservation request");
                       console.log(data);
                      })
                      .catch(err => {
                        console.log("failed to create new reservation request");
                        errFlag = true;
                        if(err.message) {
                            console.log(err.message);
                        }
                      });


    }
    console.log("Reservation Request object: ");
    console.log(ReservationRequest);
    if(errFlag) {
        res.status(500).send({
            message: "500 from createScheduleRequests"
          });
        } else {
          res.status(200).send();
    }
};

exports.updateScheduleRequests = (req, res) => {

    console.log(req.body.reservations);
    const reservations = req.body.reservations;
    const doerId = req.body.doerId;


    let errFlag = false;
    for(let i=0;i<reservations.length;i++) {

                   // Save Tutorial in the database
                    ReservationRequest.update(
                        {state: 3}, {
                        where:
                            {
                                id : reservations[i].id
                             }
                       })
                      .then(data => {
                       console.log("updatedreservation request");
                       console.log(data);
                      })
                      .catch(err => {
                        console.log("failed to update reservation request");
                        errFlag = true;
                        if(err.message) {
                            console.log(err.message);
                        }
                      });


    }
    console.log("Update reservations. ");


    if(errFlag) {
        res.status(500).send({
            message: "500 from updateScheduleRequests"
          });
        } else {
          res.status(200).send();
    }

};


exports.declineReservationRequests = (req, res) => {

    console.log(req.body.reservations);
    const reservations = req.body.reservations;
    const doerId = req.body.doerId;


    let errFlag = false;
    for(let i=0;i<reservations.length;i++) {

                   // Save Tutorial in the database
                    ReservationRequest.update(
                        {state: 5}, {
                        where:
                            {
                                id : reservations[i].id
                             }
                       })
                      .then(data => {
                       console.log("updatedreservation request");
                       console.log(data);
                      })
                      .catch(err => {
                        console.log("failed to update reservation request");
                        errFlag = true;
                        if(err.message) {
                            console.log(err.message);
                        }
                      });


    }
    console.log("Update reservations. ");


    if(errFlag) {
        res.status(500).send({
            message: "500 from updateScheduleRequests"
          });
        } else {
          res.status(200).send();
    }

};

// Retrieve all Tutorials from the database
// or only those whose title  matches
exports.findAll = (req, res) => {
//  console.log("in reservation request findAll");
  var condition =  null;

  ReservationRequest.findAll({
    attributes: {
            include: [
                [
                    // Note the wrapping parentheses in the call below!
                    db.sequelize.literal(`(
                       SELECT title FROM tutorials WHERE tutorials.id = ReservationRequest.tutorialId
                    )`),
                    'doer_name'
                ]
            ]
        }
    })
    .then(data => {
//    console.log("return data from get all reservation requests");
 //   console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
console.log("in reservation request findOne");
  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

