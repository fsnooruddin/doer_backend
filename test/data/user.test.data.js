const reqCreateUser_1 = {
	name: "John Doe",
	phone_number: "555654444",
	addresses: [
		{ type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" },
		{ type: "office", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" },
	],
};

const reqCreateUser_Malformed = {
	name: "user bill",
};

module.exports = {
	reqCreateUser_1,
	reqCreateUser_Malformed,
};
