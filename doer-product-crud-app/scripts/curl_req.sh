curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "title":"Bills Repair", "description":"HVAC, Ducting", "availability":"Sat: 10-14, Sun: 8-17", "published":"3"}' \
  http://localhost:8080/api/tutorials 

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "title":"Rogers HVAC", "description":"HVAC, Ducting", "availability":"Sun: 10-14, Mon: 8-17", "published":"5"}' \
  http://localhost:8080/api/tutorials

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "title":"Jims AC Repair", "description":"HVAC, Ducting", "availability":"Sat: 12-17, Sun: 17-23", "published":"1"}' \
  http://localhost:8080/api/tutorials

curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "title":"Pleasanton Electrical", "description":"Electrical, Fuses, Lighting", "availability":"Sat: 12-17, Sun: 17-23", "published":"1"}' \
    http://localhost:8080/api/tutorials

curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "title":"Molly Maid", "description":"Cleaning, Dusting", "availability":"Sat: 12-17, Sun: 17-23", "published":"4"}' \
    http://localhost:8080/api/tutorials


curl --header "Content-Type: application/json" \
  --request GET \
  http://localhost:8080/api/tutorials/find?availability=sun



