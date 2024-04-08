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
    expiry_date: req.body.expiry_date
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