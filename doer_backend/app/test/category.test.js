

const request = require('supertest')('http://localhost:3721/api/doer');
//const app = require('../../server.js'); // Your Express app
// var expect = require('chai').expect;
     const { expect } = require('chai');


const { reqCreateCategory_1, reqCreateCategory_2 } = require("./data/category.test.data.js");

describe('create categories', () => {

  it('should create a new category', async () => {
    const res = await request
      .post('/createCategory')
      .send(reqCreateCategory_1)
      .set('Accept', 'application/json');

    // expect(res.body).to.have.property("category_id");
     console.log(res.body);
  });

it('should create a new category', async () => {
    const res = await request
      .post('/createCategory')
      .send(reqCreateCategory_2)
      .set('Accept', 'application/json');

    // expect(res.body).to.have.property("category_id");
     console.log(res.body);
  });

});
