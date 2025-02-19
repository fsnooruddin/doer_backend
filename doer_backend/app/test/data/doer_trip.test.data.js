const createDoerTrip_1 = {
	"doer_id": "1",
	"job_id": "5",
	"description": "Trip to fix sink",
	"address": "Flat NO 121 MG road ",
	"eta": "22:22"
};

const updateDoerTrip_1 = {
	"id": "1",
	"location_update": {
		"type": "Point",
		"coordinates": [77.6879689, 27.4072289],
	}
};


const updateDoerTrip_Malformed = {
	"location_update": {

		"coordinates": [77.6879689, 27.4072289],
	}
};

module.exports = {
	createDoerTrip_1,
	updateDoerTrip_1,
	updateDoerTrip_Malformed
};
