const db = require("../models");
const utils = require("../utils/Utils.js");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new task
exports.create = (req, res) => {

    console.log("req body in create task: ");
    console.log(req.body);

    // Create a task
    const task = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        sub_category: req.body.sub_category
    };

    console.log("new task in create task: ");
    console.log(task);

    // Save task in the database
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the task."
            });
        });
};

// Find a single task with an id
exports.findOne = (req, res) => {

    const id = req.query.id;
    console.log("task-controller findOne. id = " + id);

    Task.findAll({
            where: {
                task_id: id
            }
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find task with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving task with id=" + id
            });
        });
};

// Find a single task with an id
exports.findAll = (req, res) => {

    console.log("task-controller findAll..");
    Task.findAll()
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find task in findAll`
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send({
                message: "Error retrieving task in findAll"
            });
        });
};