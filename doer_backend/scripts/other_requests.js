"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");
var {createJobRequest_1, createDoerTrip_1, updateDoerTrip_1, createDoerReview_1} = require("./other_requests_data.js");

const createJobRequestUrl = "http://localhost:8080/api/doer/createJobRequest";
const createDoerTripUrl = "http://localhost:8080/api/doer/createDoerTrip";
const createDoerReviewUrl = "http://localhost:8080/api/doer/reviewDoer";

async function rget(url) {
  const response = await axios.get(
   url
  );

  return response.data;
}

async function rpost(url, dataString) {
  const response = await axios.post(
   url,
    dataString,
  );

  return response.data;
}

async function createDoerReview(entry) {

  try {
    console.log("create DoerReview entry = " + JSON.stringify(entry));
    const response_data = await rpost(createDoerReviewUrl, entry);

   // console.log("response.body     " + response_data);
    console.log(
      "DoerReview response = " + JSON.stringify(response_data) + "    ",
    );
    return true;
  } catch (error) {
    console.log("Couldn't create DoerReview..." + JSON.stringify(entry));
    console.error(error);
    return false;
  }
}

async function createDoerTrip(entry) {

  try {
    console.log("create DoerTrip entry = " + JSON.stringify(entry));
    const response_data = await rpost(createDoerTripUrl, entry);

    //console.log("response.body     " + response_data);
    console.log(
      "DoerTrip response = " + JSON.stringify(response_data) + "    ",
    );
    return true;
  } catch (error) {
    console.log("Couldn't create DoerTrip..." + JSON.stringify(entry));
    console.error(error);
    return false;
  }
}

// Find a single Doer by services
async function createJobRequest(entry) {

  try {
    console.log("create JobRequest entry = " + JSON.stringify(entry));
    const response_data = await rpost(createJobRequestUrl, entry);

   // console.log("response.body     " + response_data);
    console.log(
      "JobRequest response = " + JSON.stringify(response_data) + "    ",
    );
    return true;
  } catch (error) {
    console.log("Couldn't create JobRequest..." + JSON.stringify(entry));
    console.error(error);
    return false;
  }
}

async function makePostRequests() {
    createJobRequest(createJobRequest_1);
       createDoerTrip(createDoerTrip_1);
       createDoerReview(createDoerReview_1);

}

async function makeGetRequests() {
    var response_data = await rget("http://localhost:8080/api/doer/getDoerById?id=2");
    console.log("getDoerById = " + JSON.stringify(response_data));

    var response_data = await rget("http://localhost:8080/api/doer/getDoerByServices?services=%elec%");
    console.log("getDoerByServices = " + JSON.stringify(response_data));

    var response_data = await rget("http://localhost:8080/api/doer/getReviewsForDoer?doerId=1");
    console.log("getReviewsForDoer = " + JSON.stringify(response_data));

    var response_data = await rget("http://localhost:8080/api/doer/findEligibleDoers?jobRequestId=19");
    console.log("findEligibileDoers = " + JSON.stringify(response_data));

    var response_data = await rget("http://localhost:8080/api/doer/getReviewById?id=2");
    console.log("getReviewById = " + JSON.stringify(response_data));

}

async function main() {

    makePostRequests();
    makeGetRequests();

}

main();
