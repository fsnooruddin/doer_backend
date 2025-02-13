const reqCreateJobRequest_1 = {
  "user_id": "11",
  "location": "94588",
  "time": "M, 12-5",
   "services": "Electrician"
}

const reqCreateJobRequest_2 = {
  "user_id": "2",
  "location": "94550",
  "time": "M, 12-5",
  "services": "Landscaping"
}

const reqCreateJobRequest_Malformed = {
  "user_id": "2",
  "time": "M, 12-5",
  "services": "Landscaping"
}

module.exports = {
  reqCreateJobRequest_1,
  reqCreateJobRequest_2
}
