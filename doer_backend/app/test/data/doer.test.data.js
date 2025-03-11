const reqCreateDoer_1 = {
	name: "Electric Chen",
	phone_number: "(510) 606-8626",
	location: "{city: Pleasanton,state: CA,zip_code: 94566,address: ['Pleasanton, CA 94566'],coordinates: {'latitude': 37.66389, 'longitude': -121.87383}}",
	services: "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
	availability: {
		slots: [
			{
				slot: {
					day: "Fri",
					start_time: "10",
					end_time: "18",
					rate: "61",
					latitude: "22.222",
					longitude: "333.333",
					radius: "45",
				},
			},
			{
				slot: {
					day: "Wed",
					start_time: "9",
					end_time: "12",
					rate: "65",
					latitude: "22.222",
					longitude: "333.333",
					radius: "43",
				},
			},
		],
	},
	rating: {
		total: 50,
		count: 100,
	},
	minimum_charges: 80,
	img_url: "https://s3-media1.fl.yelpcdn.com/bphoto/HMW0_wa9XI9pOMGsn_9h2g/o.jpg",
};

const reqCreateDoer_2 = {
	name: "Alley Electric",
	services: "[{'alias': 'electricians', 'title': 'Electricians'}, {'alias': 'lighting', 'title': 'Lighting Fixtures & Equipment'}]",
	review_count: "441",
	phone_number: "(510) 573-0427",
	rating: { total: 480, count: 100 },
	availability: {
		slots: [
			{ day: "Wed", start_time: "7", end_time: "12", rate: "61", latitude: "33.8894598", longitude: "-118.15979109999998", radius: "37" },
			{ day: "Tue", start_time: "11", end_time: "23", rate: "61", latitude: "33.8894598", longitude: "-118.15979109999998", radius: "44" },
		],
		instant_book: { on: false, hourly_rate: 80 },
	},
	minimum_charges: "84",
	location:
		"{city: Oakland,state: CA,zip_code: 94609,address: ['3883 Turquoise Way', 'Unit 1808', 'Oakland, CA 94609'],coordinates: {'latitude': 37.828407686372735, 'longitude': -122.2659522}}",
	img_url: "https://s3-media3.fl.yelpcdn.com/bphoto/sQtwge9GzoLRm77v021UUQ/o.jpg",
};
const reqCreateDoer_3 = {
	name: "Shamrockin Electric",
	services: "[{'alias': 'electricians', 'title': 'Electricians'}]",
	review_count: "52",
	phone_number: "(925) 273-0750",
	rating: { total: 500, count: 100 },
	availability: {
		slots: [
			{ day: "Thu", start_time: "10", end_time: "13", rate: "84", latitude: "37.9100783", longitude: "-122.06518190000001", radius: "29" },
			{ day: "Mon", start_time: "9", end_time: "15", rate: "96", latitude: "37.9100783", longitude: "-122.06518190000001", radius: "22" },
		],
		instant_book: { on: false, hourly_rate: 71 },
	},
	minimum_charges: "73",
	location: "{city: Livermore,state: CA,zip_code: 94550,address: ['Livermore, CA 94550'],coordinates: {'latitude': 37.67893, 'longitude': -121.76677}}",
	img_url: "https://s3-media2.fl.yelpcdn.com/bphoto/K3kGXflZXEudtsQ7PvcwUQ/o.jpg",
};

module.exports = {
	reqCreateDoer_1,
	reqCreateDoer_2,
	reqCreateDoer_3,
};
