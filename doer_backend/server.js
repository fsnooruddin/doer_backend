const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: ['http://127.0.0.1:8081', 'http://localhost:8081']
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/doer", (req, res) => {
    res.json({
        message: "Welcome to doer application."
    });
});

require("./app/routes/doer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3721;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;