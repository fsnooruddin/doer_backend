const createJobRequest_1 = {
  user_id: "11",
  location: "[77.6879689, 27.4072289]",
  time: "Sun, 12-5",
  services: "Electrician",
}

const createDoerTrip_1 = {
  doer_id: "1",
  job_request_id: "1",
  description: "Trip to fix sink",
  address: "Flat NO 121 MG road ",
  eta: "22:22",
}

const updateDoerTrip_1 = {
  id: "1",
  location_update: {
    type: "Point",
    coordinates: [77.6879689, 27.4072289],
  },
}

const createDoerReview_1 = {
  doer_id: "2",
  text: "Best Doer Ever"
}

const createDoerReview_2 = {
  doer_id: "2",
  text: "Another review Best Doer Ever"
}

const updateDoerAvailability_1 = {
                                     "doer_id": "5",
                                     "availability": [
                                         {
                                             "day": "Fri",
                                             "time": "10-13",
                                             "rate": 99,
                                             "location": "94588"
                                         },
                                         {
                                             "day": "Sat",
                                             "time": "9-17",
                                             "rate": 80,
                                             "location": "94588"
                                         }
                                     ]
                                 }

module.exports = {
  createJobRequest_1,
  createDoerTrip_1,
  updateDoerTrip_1,
  createDoerReview_1,
  createDoerReview_2,
  updateDoerAvailability_1
};
