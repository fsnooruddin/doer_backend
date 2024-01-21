const db = require("../models");
const Doer = db.doers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

  console.log("req body in create doer: ");
  console.log(req.body);

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty in create doer!"
    });
    return;
  }



  // Create a Doer
  const doer = {
    name: req.body.name,
    services: req.body.services,
    availability: req.body.availability,
    rating: req.body.rating,
    review_count: req.body.review_count,
    img_url: req.body.img_url,
    phone_number: req.body.phone_number,
    location: req.body.location
  };

  console.log("new doer in create doer: ");
  console.log(doer);


  // Save Doer in the database
  Doer.create(doer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Doer."
      });
    });
};

 exports.getTimeFromAvailability = (availability) => {
    const retArray = availability.split(":");
    if(retArray[1] === undefined) {
        return "";
    } else {
        return retArray[1];
    }
  };

  exports.getDayFromAvailability = (availability) => {
      const retArray = availability.split(":");
      return retArray[0];
  };

exports.findByAvailability = (req, res) => {
  const availability = req.query.availability;
  var retArray = null;
  if(availability) {
    retArray = availability.split(":");
  }
  const services = req.query.services;
  var condition = null;
  condition = { services: { [Op.like]: `%${services}%` } };

  if(retArray) {
       condition = { services: { [Op.like]: `%${services}%` } ,availability: {[Op.like]: `%${retArray[0]}%`} };
  } else {
     condition = { services: { [Op.like]: `%${services}%` } };
  }

  console.log("in find by availability: " + condition);
  console.log(req.query);
  Doer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Doers."
      });
    });
};

exports.findAllByServices = (req, res) => {
  const services = req.query.services;
  var condition = services ? { services: { [Op.like]: `%${services}%` } } : null;

  Doer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Doers."
      });
    });
};

// Retrieve all Doers from the database
// or only those whose title  matches
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Doer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Doers."
      });
    });
};

// Find a single Doer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("Doer-controller findOne");
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

// Update a Doer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Doer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Doer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Doer with id=${id}. Maybe Doer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Doer with id=" + id
      });
    });
};

// Delete a Doer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Doer.destroy({
    where: { id: id }
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
      res.send({ message: `${nums} Doers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Doers."
      });
    });
};


