"use strict";
//import fetch from 'node-fetch';
const fs = require("fs");
const axios = require("axios");
var {
  createJobRequest_1,
  createDoerTrip_1,
  updateDoerTrip_1,
  createDoerReview_1,
  createDoerReview_2,
} = require("./other_requests_data.js");

const createJobRequestUrl = "http://127.0.0.1:8080/api/doer/createJobRequest";
const createDoerTripUrl = "http://127.0.0.1:8080/api/doer/createDoerTrip";
const updateDoerTripUrl = "http://127.0.0.1:8080/api/doer/updateDoerTripLocation";
const createDoerReviewUrl = "http://127.0.0.1:8080/api/doer/reviewDoer";
const acceptJobUrl = "http://127.0.0.1:8080/api/doer/acceptJob?doerId=1&jobId=1";
const completeJobUrl = "http://127.0.0.1:8080/api/doer/completeJob?doerId=1&jobId=1&duration=22";

async function rget(url) {
  const response = await axios.get(url);

  return response.data;
}

async function rpost(url, dataString) {
  const response = await axios.post(url, dataString);

  return response.data;
}

async function makeCreateCall(endpoint, url, entry) {

  try {
    console.log("create " + endpoint + "  url  " + url + " entry = " + JSON.stringify(entry));
    const response_data = await rpost(url, entry);

    // console.log("response.body     " + response_data);
    console.log(endpoint + " response = " + JSON.stringify(response_data));
    return true;
  } catch (error) {
    console.log("Couldn't update " + endpoint + " ..." + JSON.stringify(entry));
    console.error(error);
    return false;
  }

}

async function makePostRequests() {

  makeCreateCall("createDoerReview", createDoerReviewUrl, createDoerReview_1);
  console.log("\n\n\n **************** \n\n\n");

   makeCreateCall("createDoerReview", createDoerReviewUrl, createDoerReview_2);
    console.log("\n\n\n **************** \n\n\n");

  makeCreateCall("createDoerTrip", createDoerTripUrl, createDoerTrip_1);
  console.log("\n\n\n **************** \n\n\n");



   makeCreateCall("createJobRequest", createJobRequestUrl, createJobRequest_1);
  console.log("\n\n\n **************** \n\n\n");

  makeCreateCall("acceptJob", acceptJobUrl, null);
    console.log("\n\n\n **************** \n\n\n");

    makeCreateCall("completeJob", completeJobUrl, null);
        console.log("\n\n\n **************** \n\n\n");

          makeCreateCall("updateDoerTrip", updateDoerTripUrl, updateDoerTrip_1);
                                                          console.log("\n\n\n **************** \n\n\n");
}

async function makeGetRequests() {
  var response_data = await rget(
    "http://127.0.0.1:8080/api/doer/getDoerById?id=2",
  );
  console.log("getDoerById = \n\n\n" + JSON.stringify(response_data));

  console.log("\n\n\n **************** \n\n\n");
  var response_data = await rget(
    "http://127.0.0.1:8080/api/doer/getDoerByServices?services=%elec%",
  );
  console.log("getDoerByServices = \n\n\n" + JSON.stringify(response_data));

  console.log("\n\n\n **************** \n\n\n");
  var response_data = await rget(
    "http://127.0.0.1:8080/api/doer/getReviewsForDoer?doerId=2",
  );
  console.log("getReviewsForDoer = \n\n\n" + JSON.stringify(response_data));

  console.log("\n\n\n **************** \n\n\n");
  var response_data = await rget(
    "http://127.0.0.1:8080/api/doer/findEligibleDoers?jobRequestId=1",
  );
  console.log("findEligibileDoers = \n\n\n" + JSON.stringify(response_data));

  console.log("\n\n\n **************** \n\n\n");
  var response_data = await rget(
    "http://127.0.0.1:8080/api/doer/getReviewById?id=2",
  );
  console.log("getReviewById = \n\n\n" + JSON.stringify(response_data));

  console.log("\n\n\n **************** \n\n\n");

   var response_data = await rget(
      "http://127.0.0.1:8080/api/doer/getDoerByServicesAndDay?services=%Elect%&day=%Wed%"
    );
    console.log("getDoerByServicesAndDay = \n\n\n" + JSON.stringify(response_data));

    console.log("\n\n\n **************** \n\n\n");
}

async function main() {
  makePostRequests();
  makeGetRequests();
}

main();
