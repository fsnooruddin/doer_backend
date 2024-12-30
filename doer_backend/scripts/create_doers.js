"use strict";
const request = require('superagent');
const fs = require('fs');


// Find a single Doer by services
async function createDoer(entry) {
var uri = 'http://localhost:8080/api/doer/createDoer';

    try {
    console.log("create Doer entry = " + JSON.stringify(entry));
    const response_data = await request.post(uri).send(entry);

       console.log("response.body     " + response_data.body);
       console.log("createDoer response = " + JSON.stringify(response_data.body) + "    " );
       return true;
      }
      catch(error)  {
        console.log("Couldn't create Doer..." + JSON.stringify(entry));
        console.error(error);
        return false;
      }

}

async function main() {

    // Accessing command line arguments in Node.js
    const args = process.argv.slice(2);

    console.log("args = ");
    console.log(args);

    let rawdata = fs.readFileSync(args[0]);
    let doer_data = JSON.parse(rawdata);

    console.log(JSON.stringify(doer_data));

    for(let i=0;i<doer_data.doers.length;i++) {
            var entry = doer_data.doers[i];
            entry.minimum_charges = entry.min_charges;
            createDoer(entry);
       }

}


main();



