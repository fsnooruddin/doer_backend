const db = require("../models");
const utils = require("../utils/Utils.js");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

  console.log("req body in create user: ");
  console.log(req.body);

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty in create user!"
    });
    return;
  }



  // Create a User
  const user = {
    name: req.body.name,
    rating: req.body.rating,
    phone_number: req.body.phone_number,
    address: req.body.address
  };

  console.log("new user in create user: ");
  console.log(user);


  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.setCurrentLocation = (req, res) => {

   console.log("in settCurrentLoction");
   console.log("body in accept Reservation Requests is: " + req.body.location);
    console.log("user id in accept Reservation Requests is: " + req.body.user_id);
   const location = req.body.location;
   const userId = req.body.user_id;

      // Save User in the database
      User.update({
            current_location: location
         }, {
            where: {
               user_id: userId
            }
         })
         .then(data => {
            console.log("updated  user current location");
            console.log(data);
       })
          .catch(err => {
             res.status(500).send({
               message:
                 err.message || "Some error occurred while updating current location."
             });
           });

};


// Retrieve all Users from the database
// or only those whose title  matches
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Retrieve all Users from the database
// or only those whose title  matches
exports.find = (req, res) => {
  console.log("query in find all is: " + JSON.stringify(req.query));
  console.log(req.query.services);
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("User-controller findOne");
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};


