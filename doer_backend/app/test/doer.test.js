

const request = require('supertest')('http://localhost:3721/api/doer');
//const app = require('../../server.js'); // Your Express app
// var expect = require('chai').expect;
     const { expect } = require('chai');


const { reqCreateDoer } = require("./data/doer.test.data.js");

describe('POST /api/createDoer', () => {
  it('should create a new doer', async () => {


    const res = await request
      .post('/createDoer')
      .send(reqCreateDoer)
      .set('Accept', 'application/json');

     //expect(res.body).to.have.property("doer_id");
     console.log(res);


  });
});

