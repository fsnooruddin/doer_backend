const reqCreateJobRequest_1 = {
  "user_id": "1",
  "longitude": "94588",
  "latitude": "94588",
  "day": "Fri",
  "req_start": "12",
  "req_end": "5",
  "services": "Electrician",
  "description": "fix sink"
}

const reqCreateJobRequest_2 = {
   "user_id": "2",
   "longitude": "94588",
   "latitude": "94588",
   "day": "Fri",
   "req_start": "12",
   "req_end": "5",
   "services": "Landscapring",
   "description": "plant roses"
}

const reqCreateJobRequest_Malformed = {
  "user_id": "2",
  "time": "M, 12-5",
  "services": "Landscaping"
}

const reqCreateJobCost_1 = {
  "job_id": "2",
  "cost": "100",
  "description": "parts fr the sink"
}

const reqCreateJobCost_2 = {
  "job_id": "2",
  "cost": "100",
  "description": "more parts for the sink"
}

module.exports = {
  reqCreateJobRequest_1,
  reqCreateJobRequest_2,
  reqCreateJobCost_1,
  reqCreateJobCost_2,
  reqCreateJobRequest_Malformed
}
