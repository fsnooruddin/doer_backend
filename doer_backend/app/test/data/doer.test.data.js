const reqCreateDoer_1 = {
  "name": "Electric Chen",
         "phone_number": "(510) 606-8626",
         "location": "{city: Pleasanton,state: CA,zip_code: 94566,address: ['Pleasanton, CA 94566'],coordinates: {'latitude': 37.66389, 'longitude': -121.87383}}",
         "services": "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
         "availability": "{\"slots\":[{\"slot\":{\"day\":\"Fri\",\"time\":\"10-18\"},\"rate\":61,\"location\":{\"coordinates\":{\"latitude\":22.222,\"longitude\":333.333},\"radius\":45}},{\"slot\":{\"day\":\"Wed\",\"time\":\"9-12\"},\"rate\":65,\"location\":{\"coordinates\":{\"latitude\":22.222,\"longitude\":333.333},\"radius\":43}}],\"instant_book\":{\"on\":false,\"hourly_rate\":61}}",
         "rating": "{\"rating\":5,\"raw\":{\"total\":500,\"count\":100}}",
         "minimum_charges": 80,
         "img_url": "https://s3-media1.fl.yelpcdn.com/bphoto/HMW0_wa9XI9pOMGsn_9h2g/o.jpg"
     }

const reqCreateDoer_2 = {
  "name": "Better Electric",
         "phone_number": "(925) 413-4215",
         "location": "{city: Livermore,state: CA,zip_code: 94550,address: ['12200 Tesla Rd', 'Livermore, CA 94550'],coordinates: {'latitude': 37.643502, 'longitude': -121.641089}}",
         "services": "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
         "availability": "{\"slots\":[{\"slot\":{\"day\":\"Wed\",\"time\":\"10-23\"},\"rate\":77,\"location\":{\"coordinates\":{\"latitude\":22.222,\"longitude\":333.333},\"radius\":30}},{\"slot\":{\"day\":\"Tue\",\"time\":\"11-15\"},\"rate\":58,\"location\":{\"coordinates\":{\"latitude\":22.222,\"longitude\":333.333},\"radius\":46}}],\"instant_book\":{\"on\":false,\"hourly_rate\":87}}",
         "rating": "{\"rating\":4.8,\"raw\":{\"total\":480,\"count\":100}}",
         "minimum_charges": 89,
         "img_url": "https://s3-media4.fl.yelpcdn.com/bphoto/RI9DpJk52cjclkVhiXridQ/o.jpg"
     }

const reqCreateDoer_3 = {
"name": "Shamrockin Electric",
        "phone_number": "(925) 273-0750",
        "location": "{city: Livermore,state: CA,zip_code: 94550,address: ['Livermore, CA 94550'],coordinates: {'latitude': 37.67893, 'longitude': -121.76677}}",
        "services": "[{'alias': 'electricians', 'title': 'Electricians'}]",
        "availability": "{\"slots\":[{\"slot\":{\"day\":\"Sat\",\"time\":\"8-20\"},\"rate\":76,\"location\":{\"coordinates\":{\"latitude\":22.222,\"longitude\":333.333},\"radius\":31}},{\"slot\":{\"day\":\"Mon\",\"time\":\"9-18\"},\"rate\":65,\"location\":{\"coordinates\":{\"latitude\":22.222,\"longitude\":333.333},\"radius\":12}}],\"instant_book\":{\"on\":false,\"hourly_rate\":98}}",
        "rating": "{\"rating\":5,\"raw\":{\"total\":500,\"count\":100}}",
        "minimum_charges": 95,
        "img_url": "https://s3-media2.fl.yelpcdn.com/bphoto/K3kGXflZXEudtsQ7PvcwUQ/o.jpg"
    }

module.exports = {
  reqCreateDoer_1,
  reqCreateDoer_2,
  reqCreateDoer_3
}
