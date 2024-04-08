const db = require("../models");
const utils = require("../utils/Utils.js");
const CCard = db.ccards;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

  console.log("req body in create ccard: ");
  console.log(req.body);


  // Create a Doer
  const ccard = {
    cardholder_name: req.body.cardholder_name,
    number: req.body.number,
    type: req.body.type,
    provider: req.body.provider,
    expiry: req.body.expiry
  };

  console.log("new ccard in create ccard: ");
  console.log(ccard);
  console.log(CCard);


  // Save Doer in the database
  CCard.create(ccard)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ccard."
      });
    });
};