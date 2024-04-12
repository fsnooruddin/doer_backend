#!/bin/bash

addrId=$(curl --header "Content-Type: application/json" \--request POST \--data '{"address_type": "home","address_1": "10 Dolby Lane","address_2": "Apt 4","city": "Tracy","state": "CA","zipcode": "94566","latitude": "222.222","longitude": "22.18882"}' \http://localhost:8080/api/doers/createAddress | jq -r '.address_id')
echo "addrId = $addrId"
str="s+ADDR_ID+"$addrId"+g"
sed $str user_data.json > user_data_1.json

ccNum=$RANDOM
echo "random number is $ccNum"
str="s+CC_ID+"$ccNum"+g"
sed $str ccard_data.json > ccard_data_1.json
ccId=$(curl --header "Content-Type: application/json" --request POST --data "@ccard_data_1.json" http://localhost:8080/api/doers/createCCard | jq -r '.ccard_id')
echo "credit card id is $ccId"
str="s+CC_ID+"$ccId"+g"
sed $str user_data_1.json > user_data_2.json

userId=$(curl --header "Content-Type: application/json" --request POST --data "@user_data_2.json" http://localhost:8080/api/doers/createUser | jq -r '.user_id')
echo "user id is:  $userId"

certNum=$RANDOM
str="s+CERT_ID+"$certNum"+g"
sed $str doer_data.json > doer_data_1.json
doerId=$(curl --header "Content-Type: application/json" --request POST --data "@doer_data_1.json" http://localhost:8080/api/doers/createDoer | jq -r '.doer_id')
echo "doer id is $doerId"

sed $str certificate_data.json > certificate_data_1.json
certId=$(curl --header "Content-Type: application/json" --request POST --data "@certificate_data_1.json" http://localhost:8080/api/doers/createCertificate | jq -r '.certificate_id')
echo "certificate id is $certId"

bookingId=$(curl --header "Content-Type: application/json" --request POST --data "@booking_data.json" http://localhost:8080/api/doers/createBooking | jq -r '.booking_id')
echo "booking id is $bookingId"
str="s+BOOKING_ID+"$bookingId"+g"
sed $str user_data_2.json > user_data_3.json


taskId=$(curl --header "Content-Type: application/json" --request POST --data "@task_data.json" http://localhost:8080/api/doers/createTask | jq -r '.task_id')
echo "task id is $taskId"

invoiceId=$(curl --header "Content-Type: application/json" --request POST --data "@invoice_data.json" http://localhost:8080/api/doers/createInvoice | jq -r '.invoice_id')
echo "invoice id is $invoiceId"

paymentId=$(curl --header "Content-Type: application/json" --request POST --data "@payment_data.json" http://localhost:8080/api/doers/createPayment | jq -r '.payment_id')
echo "payment id is $paymentId"

#jobId=$(curl --header "Content-Type: application/json" --request POST --data "@job_data.json" http://localhost:8080/api/doers/createJob)









