

const request = require('supertest')('http://localhost:3721/api/doer');
//const app = require('../../server.js'); // Your Express app
// var expect = require('chai').expect;
     const { expect } = require('chai');


const { reqCreateJobRequest_1, reqCreateJobRequest_2 } = require("./data/job_request.test.data.js");

describe('create job requests', () => {

  it('should create a new JobRequest', async () => {
    const res = await request
      .post('/createJobRequest')
      .send(reqCreateJobRequest_1)
      .set('Accept', 'application/json');

     expect(res.body).to.have.property("job_request_id");
     console.log(res.body);
  });

it('should create a new JobRequest', async () => {
    const res = await request
      .post('/createJobRequest')
      .send(reqCreateJobRequest_2)
      .set('Accept', 'application/json');

     expect(res.body).to.have.property("job_request_id");
     console.log(res.body);
  });

});

describe('modify job requests', function() {

      it('accept job request', async() => {
        const res = await request.post('/acceptJob?doerId=1&jobId=1');
        console.log(res.body);
      });

      it('complete job requests', async() => {
        const res = await request.post('/completeJob?doerId=1&jobId=1&duration=120');
        console.log(res.body);
      });

});