const db = require("../models");
const utils = require("../utils/Utils.js");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

  console.log("req body in create category: ");
  console.log(req.body);

  // Create a category
  const category = {
    name: req.body.name,
    parent_id: req.body.parent_id,
    description: req.body.description,
    time_to_complete: req.body.time_to_complete,
    price_range: req.body.price_range,
    img_url: req.body.image_url
  };

  console.log("new category in create categories: ");
  console.log(category);
  console.log(Category);

  // Save category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};

// Find a single Doer with an id
exports.findOne = (req, res) => {

  const id = req.query.id;
  console.log("Category-controller findOne. id = " + id);

  Category.findAll({
         attributes: {
            include: [
               [
                  // Note the wrapping parentheses in the call below!
                  db.sequelize.literal(`(
                       SELECT name FROM categories WHERE categories.id = Category.parent_id
                    )`),
                  'parent_name'
               ]
            ]
         },
         where: {
            id: id
         }
      })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};

// Find a single Doer with an id
exports.findAll = (req, res) => {

  console.log("Category-controller findAll..");
  Category.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category in findAll`
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving categories in findAll"
      });
    });
};



