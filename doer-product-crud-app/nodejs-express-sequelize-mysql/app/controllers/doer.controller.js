const db = require("../models");
const utils = require("../utils/Utils.js");
const Doer = db.doers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("req body in create doer: ");
    console.log(req.body);

    // Validate request

    // Create a Doer
    const doer = {
        user_id: req.body.user_id,
        service_ids: req.body.service_ids,
        certificate_id: req.body.certificate_id,
        introduction: req.body.introduction,
        availability_ids: req.body.availability_ids
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
                message: err.message || "Some error occurred while creating the Doer."
            });
        });
};

exports.setCurrentLocation = (req, res) => {

    console.log("in settCurrentLoction");
    console.log("body in accept Reservation Requests is: " + req.body.location);
    console.log("doer id in accept Reservation Requests is: " + req.body.doer_id);
    const location = req.body.location;
    const doerId = req.body.doer_id;

    // Save Doer in the database
    Doer.update({
            current_location: location
        }, {
            where: {
                doer_id: doerId
            }
        })
        .then(data => {
            console.log("accepted reservation request");
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating current location."
            });
        });

};

exports.findByAvailability = (req, res) => {
    const availability = req.query.availability;
    var retArray = null;
    if (availability) {
        retArray = availability.split(":");
    }
    const services = req.query.services;
    var condition = null;
    condition = {
        services: {
            [Op.like]: `%${services}%`
        }
    };

    if (retArray) {
        condition = {
            services: {
                [Op.like]: `%${services}%`
            },
            availability: {
                [Op.like]: `%${retArray[0]}%`
            }
        };
    } else {
        condition = {
            services: {
                [Op.like]: `%${services}%`
            }
        };
    }

    console.log("in find by availability: " + condition);
    console.log(req.query);
    Doer.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Doers."
            });
        });
};

exports.findAllByServices = (req, res) => {
    const services = req.query.services;
    var condition = services ? {
        services: {
            [Op.like]: `%${services}%`
        }
    } : null;

    Doer.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Doers."
            });
        });
};

// Retrieve all Doers from the database
// or only those whose title  matches
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    Doer.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Doers."
            });
        });
};

// Retrieve all Doers from the database
// or only those whose title  matches
exports.find = (req, res) => {
    console.log("query in find all is: " + JSON.stringify(req.query));
    console.log(req.query.services);
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    Doer.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Doers."
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
            where: {
                id: id
            }
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
                message: err.message || "Some error occurred while removing all Doers."
            });
        });
};