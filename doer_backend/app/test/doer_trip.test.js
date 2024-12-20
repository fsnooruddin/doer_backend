

const request = require('supertest')('http://localhost:3721/api/doer');
//const app = require('../../server.js'); // Your Express app
// var expect = require('chai').expect;
     const { expect } = require('chai');


const { createDoerTrip_1, updateDoerTrip_1 } = require("./data/doer_trip.test.data.js");

describe('Create Doer Trip', function() {

  it('should create a new doer trip', async () => {
    const res = await request
      .post('/createDoerTrip')
      .send(createDoerTrip_1)
      .set('Accept', 'application/json');
      console.log(res.body);
    // expect(res.body).to.have.property("doer_trip_id");

  });

});

describe('update doer trip', function() {

      it('send location update', async() => {
        const res = await request
        .post('/updateDoerTripLocation')
        .send(updateDoerTrip_1)
        .set('Accept', 'application/json');
 console.log(res.body);
        //expect(res.body).to.have.property("id");

      });

});