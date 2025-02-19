const reqCreateAddress_1 = { user_id: "1", type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" };

const reqCreateAddress_Malformed = {
	user_id: "1",
	type: "homeiiiiiii",
	street: "123 Main St",
	city: "New York",
	state: "NY",
	country: "USA",
	zipCode: "10001",
};

module.exports = {
	reqCreateAddress_1,
	reqCreateAddress_Malformed,
};
