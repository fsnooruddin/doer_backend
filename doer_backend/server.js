const express = require("express");
const cors = require("cors");
const ku = require("./app/utils/KafkaUtil.js");
const logger = require("./app/utils/Logger.js");

var corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080']
};

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");

let forceFlag = false;
const customIndex = process.argv.indexOf('--force_sync');
if (customIndex > -1) {
  // Retrieve the value after --custom
  forceFlag = process.argv[customIndex + 1];
}

db.sequelize.sync({ force: forceFlag })
    .then(() => {
        logger.info("Synced db.");
    })
    .catch((err) => {
        logger.fatal("Failed to sync db: " + err.message);
        return;
    });

//ku.init();


// simple route
app.get("/doer", (req, res) => {
    res.json({
        message: "Welcome to doer application."
    });
});

require("./app/routes/doer.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    logger.info("Server is running on port: " +  PORT) ;
});

module.exports = app;