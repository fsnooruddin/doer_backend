#!/bin/bash

 node create_categories.js
 node create_doers.js electrician-94588-10.json
 node create_doers.js flooring-94588-10.json
 node create_doers.js plumbing-94588-10.json
 node create_doers.js roofing-94588-10.json
 node category_requests.js
 node doer_requests.js
 node job_requests.js
 node message_requests.js


