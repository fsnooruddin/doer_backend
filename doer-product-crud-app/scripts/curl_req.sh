curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "location":"current_location", "doer_id":"1"}' \
  http://localhost:8080/api/doers/setDoerCurrentLocation


