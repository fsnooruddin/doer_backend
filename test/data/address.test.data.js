const reqCreateAddress_1 = { user_id: "1", type: "home", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipCode: "10001" };
const reqCreateAddress_2 = {  user_id: "1", type: "office", street: "456 Office Rd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94105" };
const reqCreateAddress_3 = {  user_id: "1", type: "gym", street: "987 Gym Rd", city: "Pleasanton", state: "CA", country: "USA", zipCode: "94588" };

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
	reqCreateAddress_2,
	reqCreateAddress_3,
	reqCreateAddress_Malformed,
};
