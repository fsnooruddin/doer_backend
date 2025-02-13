

const request = require('supertest')('http://127.0.0.1:8080/api/doer');
var { expect, jest, test } = require("@jest/globals");

const { createDoerTrip_1, updateDoerTrip_1, updateDoerTrip_Malformed } = require("./data/doer_trip.test.data.js");

async function postData(url, data) {
	try {
		const response = await request.post(url).send(data).set("Accept", "application/json");
		return response;
	} catch (error) {
		throw error;
	}
}

async function createDoerTripSuccess() {
	const res = await postData("/createDoerTrip", reqCreateDoerTripRequest_1);
	expect(res.status).toBe(200);
	expect(JSON.stringify(res.body)).toContain("doer_trip_id");
}

describe("DOER TRIP API Tests -- Successful calls", () => {

  it('should create a new doer trip', async () => {
    const res = await request
      .post('/createDoerTrip')
      .send(createDoerTrip_1)
      .set('Accept', 'application/json');
     // console.log(res.body);
      expect(res.status).toBe(200);
      expect(JSON.stringify(res.body)).toContain("doer_trip_id");

  });

   it('send location update', async() => {
          const res = await request
          .post('/updateDoerTripLocation')
          .send(updateDoerTrip_1)
          .set('Accept', 'application/json');
          //console.log(res.body);
          expect(res.status).toBe(200);
          expect(JSON.stringify(res.body)).toContain("doer_trip_id");


        });

});

describe('DOER TRIP API -- Failure Calls', function() {

it('send malformed location update', async() => {
          const res = await request
          .post('/updateDoerTripLocation')
          .send(updateDoerTrip_Malformed)
          .set('Accept', 'application/json');
          //console.log(res.body);
          expect(res.status).toBe(500);
          expect(JSON.stringify(res.body)).toContain("message");


        });


});