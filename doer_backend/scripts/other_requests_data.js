const createJobRequest_1 = {
  user_id: "11",
  location: "[77.6879689, 27.4072289]",
  time: "Sun, 12-5",
  services: "Electrician",
}

const createJobRequest_2 = {
  user_id: "21",
  location: "[37.863516, -122.034904]",
  time: "Sat, 10-11",
  services: "Plumbing",
}

const createJobRequest_3 = {
  user_id: "31",
  location: "[37.863516, -122.034904]",
  time: "Thu, 8-9",
  services: "Flooring",
}

const createDoerTrip_1 = {
  doer_id: "1",
  job_id: "1",
  description: "Trip to fix sink",
  address: "Flat NO 121 MG road ",
  eta: "22:22",
}

const updateDoerTrip_1 = {
  id: "1",
  location_update: {
    type: "Point",
    coordinates: [37.863516, -122.034904],
  },
}

const updateDoerTrip_2 = {
  id: "1",
  location_update: {
    type: "Point",
    coordinates: [37.799019, -121.921601],
  },
}

const updateDoerTrip_3 = {
  id: "1",
  location_update: {
    type: "Point",
    coordinates: [37.8050350827612, -122.00340805625],
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

const createMessage_1 = {
  "user_id": "11",
  "doer_id": "2",
  "job_id": "2",
  "message": "job is going well, no complaints"
}

const createMessage_2 = {
  "user_id": "11",
  "doer_id": "2",
  "job_id": "1",
  "message": "job sux, never again"
}

module.exports = {
  createJobRequest_1,
  createJobRequest_2,
  createJobRequest_3,
  createDoerTrip_1,
  updateDoerTrip_1,
  createDoerReview_1,
  createDoerReview_2,
  updateDoerAvailability_1,
  createMessage_1,
  createMessage_2
};
