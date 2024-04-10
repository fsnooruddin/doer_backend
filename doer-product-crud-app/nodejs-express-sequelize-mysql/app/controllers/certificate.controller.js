const db = require("../models");
const utils = require("../utils/Utils.js");
const Certificate = db.certificates;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

  console.log("req body in create certificate: ");
  console.log(req.body);


  // Create a Doer
  const certificate = {
    title: req.body.title,
    provider: req.body.provider,
    task_ids: req.body.task_ids,
    level: req.body.level,
    issue_date: req.body.issue_date,
    expiry_date: req.body.expiry_date,
    doer_id: req.body.doer_id
  };

  console.log("new certificate in create certificate: ");
  console.log(certificate);
  console.log(Certificate);


  // Save Doer in the database
  Certificate.create(certificate)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the certificate."
      });
    });
};

// Find a single certificate with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("certificate-controller findOne");
  Certificate.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Certificate with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving certificate with id=" + id
      });
    });
};
