"use strict";
const request = require('superagent');
const doer_data = require('./doer.test.data.js');

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

console.log(JSON.stringify(doer_data));

for(let i=0;i<doer_data.yelp_business_data.doers.length;i++) {
        var entry = doer_data.yelp_business_data.doers[i];
        entry.minimum_charges = entry.min_charges;
        createDoer(entry);
   }
}


main();



