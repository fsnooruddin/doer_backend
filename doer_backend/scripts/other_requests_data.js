const createJobRequest_1 = {
                             "user_id": "1",
                             "longitude": "94588",
                             "latitude": "94588",
                             "day": "Fri",
                             "req_time": "12",

                             "services": "Electrician",
                             "description": "fix sink"
                           }

const createJobRequest_2 = {
                             "user_id": "1",
                             "longitude": "94588",
                             "latitude": "94588",
                             "day": "Fri",

                             "req_time": "5",
                             "services": "Electrician",
                             "description": "fix sink"
                           }
const createJobRequest_3 = {
                             "user_id": "1",
                             "longitude": "94588",
                             "latitude": "94588",
                             "day": "Fri",
                             "req_time": "6",

                             "services": "Electrician",
                             "description": "fix sink"
                           }

const createDoerTrip_1 = {
  doer_id: "1",
  job_id: "1",
  description: "Trip to fix sink",
  address: "Flat NO 121 MG road ",
  eta: "22:22",
  status: "started"
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
  "user_id": "1",
  "doer_id": "2",
  "job_id": "2",
  "message": "job is going well, no complaints"
}

const createMessage_2 = {
  "user_id": "1",
  "doer_id": "2",
  "job_id": "1",
  "message": "job sux, never again"
}

const createUser_1 = {
  "name": "Bob User",
  "phone_number": "2029801234",
  "img_url": "profile.pic",
  addresses: [
  		{ type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
  		{ type: "office", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" },
  	],
}

const createUser_2 = {
  "name": "Jack User",
    "phone_number": "7071329077",
    "img_url": "profile.pic",
    addresses: [
    		{ type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
    		{ type: "gym", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" },
    	],
}

const createUser_3 = {
  "name": "Susie User",
    "phone_number": "5101329077",
    "img_url": "profile.pic",
    addresses: [
    		{ type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
    		{ type: "office", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" },
    	],
}

const reqCreateBadge_1 = {
  name: "cool badge",
  description: "Best badge Ever",
  icon_url: "icon.pic"
}

const reqCreateBadge_2 = {
  name: "awesome badge",
 description: "Best badge Ever",
   icon_url: "icon.pic"
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
  createMessage_2,
  createUser_1,
  createUser_2,
  createUser_3,
  reqCreateBadge_1,
  reqCreateBadge_2
};
