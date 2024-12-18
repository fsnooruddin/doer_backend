

const request = require('supertest')('http://localhost:3721/api/doer');
//const app = require('../../server.js'); // Your Express app
// var expect = require('chai').expect;
     const { expect } = require('chai');


const { reqCreateDoer_1, reqCreateDoer_2 } = require("./data/doer.test.data.js");

describe('POST /api/createDoer', () => {

  it('should create a new doer', async () => {
    const res = await request
      .post('/createDoer')
      .send(reqCreateDoer_1)
      .set('Accept', 'application/json');

     expect(res.body).to.have.property("doer_id");
     console.log(res.body);
  });

it('should create a new doer', async () => {
    const res = await request
      .post('/createDoer')
      .send(reqCreateDoer_2)
      .set('Accept', 'application/json');

     expect(res.body).to.have.property("doer_id");
     console.log(res.body);
  });

});

describe('get doers', function() {

      it('returns doers list', async() => {
        const res = await request.get('/getDoerByServices?services=%Concrete%');
        console.log(res.body);
      });

      it('returns one doer', async() => {
        const res = await request.get('/getDoerById?id=2');
        console.log(res.body);
      });

});